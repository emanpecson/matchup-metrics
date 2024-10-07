import { cn } from '@/lib/utils';
import SkeletonPlayerTable from '../skeleton/SkeletonPlayerTable';
import { getPlayerPhotoUrl, getTeamLogoUrl } from '@/utils/getPhotoUrl';
import InlineImage from '../InlineImage';
import { TriangleAlertIcon } from 'lucide-react';
import { useState } from 'react';
import { RosterBuilder } from '@/lib/RosterBuilder';
import { PlayerIncludeRegularStats } from '@/types/response/player/PlayerIncludeRegularStats';
import { yahooFantasyPpg } from '@/utils/fantasyConverter';

export const playerTableColumns = ['player', 'fantasy', 'pts', 'ast', 'reb', 'stl', 'blk', 'to', 'team', 'pos'];
export interface PlayerTableProps {
  players: PlayerIncludeRegularStats[]; // arr of players currently displayed
  isLoading: boolean;
  page: number;
  rowCount: number; // count of players currently displayed
  playersCount: number; // total players
  onRowClick: (player: PlayerIncludeRegularStats) => void;
  roster?: RosterBuilder;
}

export default function PlayerTable(props: PlayerTableProps) {
  const loadCount = props.playersCount - props.page * props.rowCount;
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const handleRowClick = (onRoster: boolean, player: PlayerIncludeRegularStats) => {
    if (!onRoster) props.onRowClick(player);
  };

  const handleMouseOver = (onRoster: boolean, i: number) => {
    if (!onRoster) setHoverIndex(i);
  };

  const handleMouseLeave = (onRoster: boolean) => {
    if (!onRoster) setHoverIndex(null);
  };

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
            {props.players.map((player: PlayerIncludeRegularStats, i: number) => {
              const rs = player.regularStats;

              let onRoster = false;
              if (props.roster)
                for (const slot of props.roster.getRoster())
                  if (slot.player && slot.player.id === player.id) onRoster = true;

              const disabledStyle = onRoster && 'opacity-40 dark:opacity-20';
              const highlightStyle =
                hoverIndex === i && 'bg-neutral-200 dark:bg-neutral-800 transition-colors duration-150 cursor-pointer';
              const conditionalStyles = highlightStyle + ' ' + disabledStyle;

              return (
                <tr
                  key={i}
                  className="sm:text-base text-sm text-neutral-600 dark:text-neutral-200"
                  onClick={() => handleRowClick(onRoster, player)}
                  onMouseOver={() => handleMouseOver(onRoster, i)}
                  onMouseLeave={() => handleMouseLeave(onRoster)}
                >
                  <td className={cn(conditionalStyles, 'px-4 py-1.5 text-left font-medium rounded-l-lg')}>
                    <InlineImage src={getPlayerPhotoUrl(player.nbaId)} alt={'plyr-img'} rounded>
                      <p>{player.name}</p>
                    </InlineImage>
                  </td>
                  <td className={cn(conditionalStyles, 'px-4 py-1.5 text-center text-wrap')}>{yahooFantasyPpg(rs)}</td>
                  <td className={cn(conditionalStyles, 'px-4 py-1.5 text-center text-nowrap')}>{rs.ppg.toFixed(1)}</td>
                  <td className={cn(conditionalStyles, 'px-4 py-1.5 text-center text-nowrap')}>{rs.apg.toFixed(1)}</td>
                  <td className={cn(conditionalStyles, 'px-4 py-1.5 text-center text-nowrap')}>{rs.rpg.toFixed(1)}</td>
                  <td className={cn(conditionalStyles, 'px-4 py-1.5 text-center text-nowrap')}>{rs.spg.toFixed(1)}</td>
                  <td className={cn(conditionalStyles, 'px-4 py-1.5 text-center text-nowrap')}>{rs.bpg.toFixed(1)}</td>
                  <td className={cn(conditionalStyles, 'px-4 py-1.5 text-center text-nowrap')}>{rs.tpg.toFixed(1)}</td>
                  <td className={cn(conditionalStyles, 'px-4 py-1.5 text-center text-nowrap')}>
                    <InlineImage src={getTeamLogoUrl(player.teamAbbreviation)} alt={player.teamAbbreviation}>
                      <p>{player.teamAbbreviation}</p>
                    </InlineImage>
                  </td>
                  <td className={cn(conditionalStyles, 'px-4 py-1.5 text-right rounded-r-lg')}>{player.position}</td>
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
