'use client';

import Paginator from '@/components/filter/Paginator';
import PositionSelect from '@/components/filter/PositionSelect';
import SearchBar from '@/components/filter/SearchBar';
import { TeamCombobox } from '@/components/filter/TeamCombobox';
import PlayerTable from '@/components/player/PlayerTable';
import { useLoadData } from '@/hooks/useLoadData';
import { Player } from '@prisma/client';
import { useState } from 'react';

export default function Temp() {
  const rowCount = 12;
  const [players, setPlayers] = useState<Player[]>([]);
  const [playersCount, setPlayersCount] = useState(0);
  const [isLoadingPlayers, setIsLoadingPlayers] = useState(false);

  const [filterTeam, setFilterTeam] = useState('');
  const [filterPosition, setFilterPosition] = useState('');
  const [filterName, setFilterName] = useState('');
  const [page, setPage] = useState(0);

  useLoadData({
    endpoint: `/api/player?name=${filterName}&team=${filterTeam}&position=${filterPosition}&skip=${page * rowCount}&take=${rowCount}`,
    onDataLoaded: ({ players, playersCount }) => {
      setPlayers(players);
      setPlayersCount(playersCount);
    },
    delay: 100,
    setIsLoading: setIsLoadingPlayers,
  });

  return (
    <div>
      <div className="pt-28 flex place-items-center flex-col w-full">
        <Paginator
          onPrev={() => setPage((prev) => prev - 1)}
          onNext={() => setPage((prev) => prev + 1)}
          // skip={skip}
          rowCount={rowCount}
          page={page}
          totalCount={playersCount}
        />
        <div className="flex space-x-2 justify-center w-5/6">
          <SearchBar onValueChange={setFilterName} />
          <TeamCombobox onValueChange={setFilterTeam} />
          <PositionSelect onValueChange={setFilterPosition} value={filterPosition} />
        </div>
        <PlayerTable players={players} isLoading={isLoadingPlayers} rowCount={rowCount} />
      </div>
    </div>
  );
}
