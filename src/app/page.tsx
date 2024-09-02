'use client';

import { useLoadData } from '@/hooks/useLoadData';
import { Player } from '@prisma/client';
import { useState } from 'react';

export default function Home() {
  const [players, setPlayers] = useState<Player[]>([]);
  useLoadData({ apiEndpoint: '/api/player', onDataLoaded: setPlayers });

  return (
    <div className="h-screen w-screen flex justify-center place-items-center">
      <div className="text-center">{JSON.stringify(players)}</div>
    </div>
  );
}
