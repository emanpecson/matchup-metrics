'use client';

import Paginator from '@/components/filter/Paginator';
import PositionSelect from '@/components/filter/PositionSelect';
import ResetFilters from '@/components/filter/ResetFilters';
import SearchBar from '@/components/filter/SearchBar';
import { TeamCombobox } from '@/components/filter/TeamCombobox';
import PlayerDialog from '@/components/player/dialog/PlayerDialog';
import PlayerTable from '@/components/player/PlayerTable';
import { useLoadData } from '@/hooks/useLoadData';
import { RosterBuilder } from '@/types/RosterBuilder';
import { Player } from '@prisma/client';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface PlayerIndexProps {
  rowCount: number;
  FooterElement?: () => JSX.Element;
  setFocusPlayer?: Dispatch<SetStateAction<Player | null>>;
  roster?: RosterBuilder;
}

export default function PlayerIndex(props: PlayerIndexProps) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [playersCount, setPlayersCount] = useState(0);
  const [isLoadingPlayers, setIsLoadingPlayers] = useState(false);

  const [filterTeam, setFilterTeam] = useState('');
  const [filterPosition, setFilterPosition] = useState('');
  const [filterName, setFilterName] = useState('');
  const [page, setPage] = useState(0);
  const [focusPlayer, setFocusPlayer] = useState<Player | null>(null);

  const handleFilterReset = () => {
    setFilterTeam('');
    setFilterName('');
    setFilterPosition('');
  };

  const handleRowClick = (player: Player) => {
    setFocusPlayer(player);
    if (!!props.setFocusPlayer) props.setFocusPlayer(player);
  };

  useLoadData({
    endpoint: `/api/player?name=${filterName}&team=${filterTeam}&position=${filterPosition}&skip=${page * props.rowCount}&take=${props.rowCount}`,
    onDataLoaded: ({ players, playersCount }) => {
      setPlayers(players);
      setPlayersCount(playersCount);
    },
    delay: 100,
    setIsLoading: setIsLoadingPlayers,
  });

  useEffect(() => setPage(0), [filterTeam, filterPosition, filterName]);

  return (
    <div>
      <div className="flex place-items-center flex-col w-full space-y-1">
        <SearchBar onValueChange={setFilterName} value={filterName} />
        <div className="flex space-x-2 justify-between place-items-center w-full">
          <TeamCombobox onValueChange={setFilterTeam} value={filterTeam} />
          <PositionSelect onValueChange={setFilterPosition} value={filterPosition} />
          <ResetFilters disabled={!filterTeam && !filterName && !filterPosition} onClick={handleFilterReset} />
          <Paginator
            onPrev={() => setPage((prev) => prev - 1)}
            onNext={() => setPage((prev) => prev + 1)}
            rowCount={props.rowCount}
            page={page}
            totalCount={playersCount}
          />
        </div>
        <PlayerTable
          players={players}
          isLoading={isLoadingPlayers}
          rowCount={props.rowCount}
          page={page}
          playersCount={playersCount}
          onRowClick={handleRowClick}
          roster={props.roster}
        />
      </div>

      <PlayerDialog player={focusPlayer} setPlayer={setFocusPlayer} FooterElement={props.FooterElement} />
    </div>
  );
}
