import { PlayerIncludeRegularStats } from '@/types/response/player/PlayerIncludeRegularStats';
import StatCompareIcon from './StatCompareIcon';
import { cn } from '@/lib/utils';
import { yahooFantasyPpg } from '@/utils/fantasyConverter';

interface PlayerStatsCompareProps {
  player1: PlayerIncludeRegularStats | null;
  player2: PlayerIncludeRegularStats | null;
}

export default function PlayerStatsCompareTable(props: PlayerStatsCompareProps) {
  /**
   * Displays comparison of a stat
   * @param {Object} props - Stats to compare
   * @returns {JSX.Element}
   */
  const FormatStat = (props: { stat?: number; vsStat?: number; justifyRight?: boolean }): JSX.Element => {
    return (
      <div
        className={cn(props.justifyRight ? 'justify-end' : 'justify-start', 'flex space-x-1 place-items-center w-full')}
      >
        {!props.justifyRight && <StatCompareIcon thisStat={props.stat ?? 0} thatStat={props.vsStat ?? 0} />}
        <span className="font-semibold">{props.stat}</span>
        {props.justifyRight && <StatCompareIcon thisStat={props.stat ?? 0} thatStat={props.vsStat ?? 0} />}
      </div>
    );
  };

  /**
   * Displays player stats
   * @param {Object} props - Source for stats
   * @returns {JSX.Element}
   */
  const PlayerStats = (props: {
    player: PlayerIncludeRegularStats | null;
    vsPlayer: PlayerIncludeRegularStats | null;
    justifyRight?: boolean;
  }): JSX.Element => {
    const p1Stats = props.player?.regularStats;
    const p2Stats = props.vsPlayer?.regularStats;

    return (
      <div className="divide-y w-full">
        <FormatStat
          stat={p1Stats ? (yahooFantasyPpg(p1Stats) as unknown as number) : 0}
          vsStat={p2Stats ? (yahooFantasyPpg(p2Stats) as unknown as number) : 0}
          justifyRight={props.justifyRight}
        />
        <FormatStat stat={p1Stats?.ppg ?? 0} vsStat={p2Stats?.ppg ?? 0} justifyRight={props.justifyRight} />
        <FormatStat stat={p1Stats?.apg ?? 0} vsStat={p2Stats?.apg ?? 0} justifyRight={props.justifyRight} />
        <FormatStat stat={p1Stats?.rpg ?? 0} vsStat={p2Stats?.rpg ?? 0} justifyRight={props.justifyRight} />
        <FormatStat stat={p1Stats?.spg ?? 0} vsStat={p2Stats?.spg ?? 0} justifyRight={props.justifyRight} />
        <FormatStat stat={p1Stats?.bpg ?? 0} vsStat={p2Stats?.bpg ?? 0} justifyRight={props.justifyRight} />
        <FormatStat stat={p1Stats?.plusMinus ?? 0} vsStat={p2Stats?.plusMinus ?? 0} justifyRight={props.justifyRight} />
        <FormatStat stat={p1Stats?.mpg ?? 0} vsStat={p2Stats?.mpg ?? 0} justifyRight={props.justifyRight} />
        <FormatStat stat={p1Stats?.fgPct ?? 0} vsStat={p2Stats?.fgPct ?? 0} justifyRight={props.justifyRight} />
        <FormatStat stat={p1Stats?.fg3Pct ?? 0} vsStat={p2Stats?.fg3Pct ?? 0} justifyRight={props.justifyRight} />
        <FormatStat stat={p1Stats?.ftPct ?? 0} vsStat={p2Stats?.ftPct ?? 0} justifyRight={props.justifyRight} />
        <FormatStat stat={p1Stats?.tpg ?? 0} vsStat={p2Stats?.tpg ?? 0} justifyRight={props.justifyRight} />
        <FormatStat stat={p1Stats?.gp ?? 0} vsStat={p2Stats?.gp ?? 0} justifyRight={props.justifyRight} />
      </div>
    );
  };

  return (
    <table className="w-full">
      <tbody>
        <tr className="w-full">
          <td>
            <PlayerStats player={props.player1} vsPlayer={props.player2} />
          </td>

          <td className="text-center divide-y w-full font-bold text-neutral-700 dark:text-neutral-300 uppercase">
            <p>Fantasy Points</p>
            <p>Points</p>
            <p>Assists</p>
            <p>Rebounds</p>
            <p>Steals</p>
            <p>Blocks</p>
            <p>+/-</p>
            <p>Minutes</p>
            <p>FG %</p>
            <p>3PT %</p>
            <p>FT %</p>
            <p>Turnovers</p>
            <p>Games</p>
          </td>

          <td>
            <PlayerStats player={props.player2} vsPlayer={props.player1} justifyRight />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
