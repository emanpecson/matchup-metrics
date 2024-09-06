import { cn } from '@/lib/utils';
import { Player } from '@prisma/client';
import SkeletonPlayerTable from '../skeleton/SkeletonPlayerTable';

export const playerTableColumns = ['name', 'fantasy', 'pts', 'ast', 'reb', 'stl', 'blk', 'to', 'team', 'pos'];

export default function PlayerTable({ players, isLoading }: { players: Player[]; isLoading: boolean }) {
  return (
    <div className="border rounded-xl p-6 min-w-[60rem]">
      {isLoading ? (
        <SkeletonPlayerTable />
      ) : (
        <table className="w-full">
          <thead>
            <tr className="sm:text-sm text-xs uppercase text-neutral-500">
              {playerTableColumns.map((col: string, i: number) => {
                const isFirst = i === 0;
                const isLast = i === playerTableColumns.length - 1;
                return (
                  <th
                    key={i}
                    className={cn(isFirst ? 'text-left' : isLast ? 'text-right' : 'text-center', 'px-4 pb-2')}
                  >
                    {col}
                  </th>
                );
              })}
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
      )}
    </div>
  );
}
