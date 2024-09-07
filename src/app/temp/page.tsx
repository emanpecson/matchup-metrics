'use client';

import Paginator from '@/components/filter/Paginator';
import PositionSelect from '@/components/filter/PositionSelect';
import ResetFilters from '@/components/filter/ResetFilters';
import SearchBar from '@/components/filter/SearchBar';
import { TeamCombobox } from '@/components/filter/TeamCombobox';
import PlayerDialog from '@/components/player/PlayerDialog';
import PlayerTable from '@/components/player/PlayerTable';
import { useLoadData } from '@/hooks/useLoadData';
import { Player } from '@prisma/client';
import { useEffect, useState } from 'react';

export default function Temp() {
  const rowCount = 12;
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
  };

  useLoadData({
    endpoint: `/api/player?name=${filterName}&team=${filterTeam}&position=${filterPosition}&skip=${page * rowCount}&take=${rowCount}`,
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
      <div className="pt-28 flex place-items-center flex-col w-full">
        <Paginator
          onPrev={() => setPage((prev) => prev - 1)}
          onNext={() => setPage((prev) => prev + 1)}
          rowCount={rowCount}
          page={page}
          totalCount={playersCount}
        />
        <div className="flex space-x-2 justify-center w-5/6">
          <SearchBar onValueChange={setFilterName} value={filterName} />
          <TeamCombobox onValueChange={setFilterTeam} value={filterTeam} />
          <PositionSelect onValueChange={setFilterPosition} value={filterPosition} />
          <ResetFilters disabled={!filterTeam && !filterName && !filterPosition} onClick={handleFilterReset} />
        </div>
        <PlayerTable
          players={players}
          isLoading={isLoadingPlayers}
          rowCount={rowCount}
          page={page}
          playersCount={playersCount}
          onRowClick={handleRowClick}
        />
      </div>

      <PlayerDialog player={focusPlayer} setPlayer={setFocusPlayer} />
    </div>
  );
}
