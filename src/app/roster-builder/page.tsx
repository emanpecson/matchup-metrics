'use client';

import PlayerIndex from '@/components/player/PlayerIndex';
import RosterItem from '@/components/roster/RosterItem';
import { useLoadData } from '@/hooks/useLoadData';
import { Player } from '@prisma/client';
import { useState } from 'react';

export default function RosterBuilderPage() {
  const [player, setPlayer] = useState<Player | null>(null);
  const [player2, setPlayer2] = useState<Player | null>(null);
  useLoadData({
    endpoint: '/api/player?name=russell&take=10',
    onDataLoaded: (data) => {
      setPlayer(data.players[0]);
      setPlayer2(data.players[1]);
    },
  });

  return (
    <div className="space-y-8">
      <div className="flex space-x-6 justify-center">
        <RosterItem player={player} position="G" />
        <RosterItem player={player2} position="G" />
        <RosterItem player={null} position="F" />
        <RosterItem player={null} position="F" />
        <RosterItem player={null} position="C" />
      </div>
      <PlayerIndex rowCount={6} />
    </div>
  );
}
