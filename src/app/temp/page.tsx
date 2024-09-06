'use client';

import PositionSelect from '@/components/filter/PositionSelect';
import SearchBar from '@/components/filter/SearchBar';
import { TeamCombobox } from '@/components/filter/TeamCombobox';
import PlayerTable from '@/components/player/PlayerTable';
import { useLoadData } from '@/hooks/useLoadData';
import { Player } from '@prisma/client';
import { useState } from 'react';

export default function Temp() {
  // const [tempPlayer, setTempPlayer] = useState<Player | null>(null);
  // const [isLoading, setIsLoading] = useState(false);

  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoadingPlayers, setIsLoadingPlayers] = useState(false);

  const [filterTeam, setFilterTeam] = useState('');
  const [filterPosition, setFilterPosition] = useState('');
  const [filterName, setFilterName] = useState('');

  // useLoadData({
  //   apiEndpoint: '/api/player?searchInput=jalen green',
  //   onDataLoaded: (data: Player[]) => setTempPlayer(data[0]),
  //   setIsLoading,
  // });

  useLoadData({
    endpoint: `/api/player?name=${filterName}&team=${filterTeam}&position=${filterPosition}`,
    onDataLoaded: setPlayers,
    delay: 100,
    setIsLoading: setIsLoadingPlayers,
  });

  return (
    // <div className="w-full h-screen flex place-items-center justify-center">
    //   {isLoading ? <div>loading...</div> : tempPlayer ? <PlayerTable /> : <div>not found</div>}
    // </div>
    <div>
      <div className="pt-28 flex place-items-center flex-col w-full">
        {/* {JSON.stringify(Object.entries(teams))} */}

        <div className="flex space-x-2 justify-center">
          <SearchBar onValueChange={setFilterName} />
          <TeamCombobox onValueChange={setFilterTeam} />
          <PositionSelect onValueChange={setFilterPosition} value={filterPosition} />
        </div>
        <PlayerTable players={players} isLoading={isLoadingPlayers} />
      </div>
    </div>
  );
}
