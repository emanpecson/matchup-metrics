import { cn } from '@/lib/utils';
import { Player } from '@prisma/client';
import SkeletonPlayerTable from '../skeleton/SkeletonPlayerTable';
import { getPlayerPhotoUrl, getTeamLogoUrl } from '@/utils/getPhotoUrl';
import teams from '@/data/teams';
import InlineImage from '../InlineImage';

export const playerTableColumns = ['name', 'fantasy', 'pts', 'ast', 'reb', 'stl', 'blk', 'to', 'team', 'pos'];
export interface PlayerTableProps {
  players: Player[];
  isLoading: boolean;
  rowCount: number;
  page: number;
  playersCount: number;
}

export default function PlayerTable(props: PlayerTableProps) {
  const loadCount = props.playersCount - props.page * props.rowCount;

  return (
    <div className="border rounded-xl p-6 min-w-[60rem]">
      {props.isLoading ? (
        <SkeletonPlayerTable rowCount={loadCount <= props.rowCount ? loadCount : props.rowCount} />
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
            {props.players.map((player: Player, i: number) => (
              <tr key={i} className="sm:text-base text-sm text-neutral-600 dark:text-neutral-200">
                <td className="px-4 py-1.5 text-left font-medium">
                  <InlineImage src={getPlayerPhotoUrl(player.nbaId)} alt={'plyr-img'} rounded>
                    <p>{player.name}</p>
                  </InlineImage>
                </td>
                <td className="px-4 py-1.5 text-center text-wrap">{player.fantasyPpg}</td>
                <td className="px-4 py-1.5 text-center text-nowrap">{player.ppg}</td>
                <td className="px-4 py-1.5 text-center text-nowrap">{player.apg}</td>
                <td className="px-4 py-1.5 text-center text-nowrap">{player.rpg}</td>
                <td className="px-4 py-1.5 text-center text-nowrap">{player.spg}</td>
                <td className="px-4 py-1.5 text-center text-nowrap">{player.bpg}</td>
                <td className="px-4 py-1.5 text-center text-nowrap">{player.tpg}</td>
                <td className="px-4 py-1.5 text-center text-nowrap">
                  <InlineImage src={getTeamLogoUrl(teams[player.team as keyof typeof teams].nbaId)} alt={player.team}>
                    <p>{player.team}</p>
                  </InlineImage>
                </td>
                <td className="px-4 py-1.5 text-right">{player.position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
