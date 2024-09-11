import { cn } from '@/lib/utils';
import { Player } from '@prisma/client';
import SkeletonPlayerTable from '../skeleton/SkeletonPlayerTable';
import { getPlayerPhotoUrl, getTeamLogoUrl } from '@/utils/getPhotoUrl';
import teams from '@/data/teams';
import InlineImage from '../InlineImage';
import { TriangleAlertIcon } from 'lucide-react';
import { useState } from 'react';

export const playerTableColumns = ['player', 'fantasy', 'pts', 'ast', 'reb', 'stl', 'blk', 'to', 'team', 'pos'];
export interface PlayerTableProps {
  players: Player[]; // arr of players currently displayed
  isLoading: boolean;
  page: number;
  rowCount: number; // count of players currently displayed
  playersCount: number; // total players
  onRowClick: (player: Player) => void;
}

export default function PlayerTable(props: PlayerTableProps) {
  const loadCount = props.playersCount - props.page * props.rowCount;
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <div className="border rounded-xl p-6 min-w-[60rem] w-full">
      {props.isLoading ? (
        <SkeletonPlayerTable rowCount={loadCount <= props.rowCount && loadCount != 0 ? loadCount : props.rowCount} />
      ) : props.playersCount > 0 ? (
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
          <tbody className="divide-y relative">
            {props.players.map((player: Player, i: number) => {
              const highlight =
                hoverIndex === i && 'bg-neutral-200 dark:bg-neutral-800 transition-colors duration-150 cursor-pointer';
              return (
                <tr
                  key={i}
                  className="sm:text-base text-sm text-neutral-600 dark:text-neutral-200"
                  onClick={() => props.onRowClick(player)}
                  onMouseOver={() => setHoverIndex(i)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  <td className={cn(highlight, 'px-4 py-1.5 text-left font-medium rounded-l-lg')}>
                    <InlineImage src={getPlayerPhotoUrl(player.nbaId)} alt={'plyr-img'} rounded>
                      <p>{player.name}</p>
                    </InlineImage>
                  </td>
                  <td className={cn(highlight, 'px-4 py-1.5 text-center text-wrap')}>{player.fantasyPpg}</td>
                  <td className={cn(highlight, 'px-4 py-1.5 text-center text-nowrap')}>{player.ppg}</td>
                  <td className={cn(highlight, 'px-4 py-1.5 text-center text-nowrap')}>{player.apg}</td>
                  <td className={cn(highlight, 'px-4 py-1.5 text-center text-nowrap')}>{player.rpg}</td>
                  <td className={cn(highlight, 'px-4 py-1.5 text-center text-nowrap')}>{player.spg}</td>
                  <td className={cn(highlight, 'px-4 py-1.5 text-center text-nowrap')}>{player.bpg}</td>
                  <td className={cn(highlight, 'px-4 py-1.5 text-center text-nowrap')}>{player.tpg}</td>
                  <td className={cn(highlight, 'px-4 py-1.5 text-center text-nowrap')}>
                    <InlineImage src={getTeamLogoUrl(teams[player.team as keyof typeof teams].nbaId)} alt={player.team}>
                      <p>{player.team}</p>
                    </InlineImage>
                  </td>
                  <td className={cn(highlight, 'px-4 py-1.5 text-right rounded-r-lg')}>{player.position}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="flex justify-center w-full">
          <div className="flex space-x-1.5 place-items-center text-neutral-600 dark:text-neutral-400">
            <TriangleAlertIcon size={20} />
            <p className="font-semibold">No data</p>
          </div>
        </div>
      )}
    </div>
  );
}
