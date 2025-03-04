import { LineupBuilder } from '@/types/LineupBuilder';
import FormatStat from './FormatStat';

interface LineupStatsCompareProps {
  lineup1: LineupBuilder;
  lineup2: LineupBuilder;
}

export default function LineupStatsCompare(props: LineupStatsCompareProps) {
  /**
   * Displays lineups' stat averages
   * @param {Object} props - Source for stats
   * @returns {JSX.Element}
   */
  const DisplayLineupAverageStats = (props: {
    lineup: LineupBuilder;
    vsLineup: LineupBuilder;
    justifyRight?: boolean;
  }): JSX.Element => {
    const stats = props.lineup.getLineupStats();
    const vsStats = props.vsLineup.getLineupStats();

    return (
      <div className="divide-y w-full">
        <FormatStat stat={stats.fantasyAvg} vsStat={vsStats.fantasyAvg} justifyRight={props.justifyRight} />
        <FormatStat stat={stats.pointsAvg} vsStat={vsStats.pointsAvg} justifyRight={props.justifyRight} />
        <FormatStat stat={stats.assistsAvg} vsStat={vsStats.assistsAvg} justifyRight={props.justifyRight} />
        <FormatStat stat={stats.reboundsAvg} vsStat={vsStats.reboundsAvg} justifyRight={props.justifyRight} />
        <FormatStat stat={stats.stealsAvg} vsStat={vsStats.stealsAvg} justifyRight={props.justifyRight} />
        <FormatStat stat={stats.blocksAvg} vsStat={vsStats.blocksAvg} justifyRight={props.justifyRight} />
        <FormatStat stat={stats.turnoversAvg} vsStat={vsStats.turnoversAvg} justifyRight={props.justifyRight} reverse />
        <FormatStat stat={stats.minutesAvg} vsStat={vsStats.minutesAvg} justifyRight={props.justifyRight} />
        <FormatStat stat={stats.plusMinusAvg} vsStat={vsStats.plusMinusAvg} justifyRight={props.justifyRight} />
        <FormatStat stat={stats.fgPct} vsStat={vsStats.fgPct} justifyRight={props.justifyRight} showPercent />
        <FormatStat stat={stats.fg3Pct} vsStat={vsStats.fg3Pct} justifyRight={props.justifyRight} showPercent />
        <FormatStat stat={stats.ftPct} vsStat={vsStats.ftPct} justifyRight={props.justifyRight} showPercent />
      </div>
    );
  };

  /**
   * Displays lineups' stat sums
   * @param {Object} props - Source for stats
   * @returns {JSX.Element}
   */
  const DisplayLineupSumStats = (props: {
    lineup: LineupBuilder;
    vsLineup: LineupBuilder;
    justifyRight?: boolean;
  }): JSX.Element => {
    const stats = props.lineup.getLineupStats();
    const vsStats = props.vsLineup.getLineupStats();

    return (
      <div className="divide-y w-full">
        <FormatStat stat={stats.fantasySum} vsStat={vsStats.fantasySum} justifyRight={props.justifyRight} />
        <FormatStat stat={stats.pointsSum} vsStat={vsStats.pointsSum} justifyRight={props.justifyRight} />
        <FormatStat stat={stats.assistsSum} vsStat={vsStats.assistsSum} justifyRight={props.justifyRight} />
        <FormatStat stat={stats.reboundsSum} vsStat={vsStats.reboundsSum} justifyRight={props.justifyRight} />
        <FormatStat stat={stats.stealsSum} vsStat={vsStats.stealsSum} justifyRight={props.justifyRight} />
        <FormatStat stat={stats.blocksSum} vsStat={vsStats.blocksSum} justifyRight={props.justifyRight} />
        <FormatStat stat={stats.turnoversSum} vsStat={vsStats.turnoversSum} justifyRight={props.justifyRight} reverse />
        <FormatStat stat={stats.minutesSum} vsStat={vsStats.minutesSum} justifyRight={props.justifyRight} />
        <FormatStat stat={stats.plusMinusSum} vsStat={vsStats.plusMinusSum} justifyRight={props.justifyRight} />
        <FormatStat stat={undefined} vsStat={undefined} justifyRight={props.justifyRight} />
        <FormatStat stat={undefined} vsStat={undefined} justifyRight={props.justifyRight} />
        <FormatStat stat={undefined} vsStat={undefined} justifyRight={props.justifyRight} />
      </div>
    );
  };

  return (
    <table className="w-full">
      <thead>
        <tr className="text-sm">
          <th className="text-left font-semibold">
            {props.lineup1.getSize() > 1 && <span className="text-left font-semibold">Sums</span>}
          </th>
          <th className="text-left font-semibold">
            {props.lineup1.getSize() > 1 && <span className="text-left font-semibold">Averages</span>}
          </th>
          <th />
          <th className="text-right font-semibold">
            {props.lineup2.getSize() > 1 && <span className="text-left font-semibold">Averages</span>}
          </th>
          <th className="text-right font-semibold">
            {props.lineup2.getSize() > 1 && <span className="text-left font-semibold">Sums</span>}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="w-full">
          <td className="px-0">
            {props.lineup1.getSize() > 1 && <DisplayLineupSumStats lineup={props.lineup1} vsLineup={props.lineup2} />}
          </td>
          <td className="px-0">
            <DisplayLineupAverageStats lineup={props.lineup1} vsLineup={props.lineup2} />
          </td>

          <td className="text-center divide-y w-full font-bold text-neutral-700 dark:text-neutral-300 uppercase">
            <p>Fantasy Points</p>
            <p>Points</p>
            <p>Assists</p>
            <p>Rebounds</p>
            <p>Steals</p>
            <p>Blocks</p>
            <p>Turnovers</p>
            <p>Minutes</p>
            <p>+/-</p>
            <p>FG %</p>
            <p>3PT %</p>
            <p>FT %</p>
          </td>

          <td className="px-0">
            <DisplayLineupAverageStats lineup={props.lineup2} vsLineup={props.lineup1} justifyRight />
          </td>
          <td className="px-0">
            {props.lineup2.getSize() > 1 && (
              <DisplayLineupSumStats lineup={props.lineup2} vsLineup={props.lineup1} justifyRight />
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
