'use client';

import { useLoadData } from '@/hooks/useLoadData';
import { Player } from '@prisma/client';
import { useState } from 'react';

export default function PlayerTable({ players, isLoading }: { players: Player[]; isLoading: boolean }) {
  // const [isLoading, setIsLoading] = useState(false);

  // useLoadData({
  //   apiEndpoint: `/api/player?team=GSW`,
  //   onDataLoaded: setPlayers,
  //   delay: 100,
  //   setIsLoading,
  // });

  return (
    <div className="border rounded-xl p-6">
      <table>
        <thead>
          <tr className="sm:text-sm text-xs uppercase text-neutral-500">
            <th className="px-4 pb-2 text-left">Name</th>
            <th className="px-4 pb-2 text-center">Fantasy</th>
            <th className="px-4 pb-2 text-center">Pts</th>
            <th className="px-4 pb-2 text-center">Ast</th>
            <th className="px-4 pb-2 text-center">Reb</th>
            <th className="px-4 pb-2 text-center">Stl</th>
            <th className="px-4 pb-2 text-center">Blk</th>
            <th className="px-4 pb-2 text-center">To</th>
            <th className="px-4 pb-2 text-center">Team</th>
            <th className="px-4 pb-2 text-right">Pos</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {players.map((player: Player, i: number) => (
            <tr key={i} className="sm:text-base text-sm text-neutral-600 dark:text-neutral-200">
              <td className="px-4 py-1.5 text-left font-medium">{player.name}</td>
              <td className="px-4 py-1.5 text-center">{player.fantasyPpg}</td>
              <td className="px-4 py-1.5 text-center">{player.ppg}</td>
              <td className="px-4 py-1.5 text-center">{player.apg}</td>
              <td className="px-4 py-1.5 text-center">{player.rpg}</td>
              <td className="px-4 py-1.5 text-center">{player.spg}</td>
              <td className="px-4 py-1.5 text-center">{player.bpg}</td>
              <td className="px-4 py-1.5 text-center">{player.tpg}</td>
              <td className="px-4 py-1.5 text-center">{player.team}</td>
              <td className="px-4 py-1.5 text-right">{player.position}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
