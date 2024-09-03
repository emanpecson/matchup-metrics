'use client';

import PlayerCard from '@/components/PlayerCard';
import { useLoadData } from '@/hooks/useLoadData';
import { Player } from '@prisma/client';
import { useState } from 'react';

export default function Temp() {
  const [tempPlayer, setTempPlayer] = useState<Player | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  useLoadData({
    apiEndpoint: '/api/player?searchInput=jalen green',
    onDataLoaded: (data: Player[]) => setTempPlayer(data[0]),
    setIsLoading,
  });

  return (
    <div className="w-full h-screen flex place-items-center justify-center">
      {isLoading ? <div>loading...</div> : tempPlayer ? <PlayerCard player={tempPlayer} /> : <div>not found</div>}
    </div>
  );
}
