import { yahooFantasyPpg } from '@/utils/fantasyConverter';
import StatCompareIcon from './StatCompareIcon';
import { PlayerIncludeRegularStats } from '@/types/response/player/PlayerIncludeRegularStats';

interface PlayerStatsCompareProps {
  thisPlayer: PlayerIncludeRegularStats;
  thatPlayer: PlayerIncludeRegularStats;
}

export default function PlayerStatsCompareSample(props: PlayerStatsCompareProps) {
  const thisRs = props.thisPlayer.regularStats;
  const thatRs = props.thatPlayer.regularStats;

  return (
    <div className="flex space-x-4">
      <table>
        <tbody>
          <tr>
            <td className="text-left uppercase text-xs text-neutral-500 font-bold">FTSY</td>
            <td className="text-right text-sm pl-2 pr-0.5">{yahooFantasyPpg(thisRs)}</td>
            <td>
              <StatCompareIcon
                thisStat={yahooFantasyPpg(thisRs) as unknown as number}
                thatStat={yahooFantasyPpg(thatRs) as unknown as number}
              />
            </td>
          </tr>

          <tr>
            <td className="text-left uppercase text-xs text-neutral-500 font-bold">PPG</td>
            <td className="text-right text-sm pl-2 pr-0.5">{thisRs.ppg.toFixed(1)}</td>
            <td>
              <StatCompareIcon thisStat={thisRs.ppg} thatStat={thatRs.ppg} />
            </td>
          </tr>

          <tr>
            <td className="text-left uppercase text-xs text-neutral-500 font-bold">APG</td>
            <td className="text-right text-sm pl-2 pr-0.5">{thisRs.apg.toFixed(1)}</td>
            <td>
              <StatCompareIcon thisStat={thisRs.apg} thatStat={thatRs.apg} />
            </td>
          </tr>

          <tr>
            <td className="text-left uppercase text-xs text-neutral-500 font-semibold">RPG</td>
            <td className="text-right text-sm pl-2 pr-0.5">{thisRs.rpg.toFixed(1)}</td>
            <td>
              <StatCompareIcon thisStat={thisRs.rpg} thatStat={thatRs.rpg} />
            </td>
          </tr>
        </tbody>
      </table>

      <table>
        <tbody>
          <tr>
            <td className="text-left uppercase text-xs text-neutral-500 font-semibold">BPG</td>
            <td className="text-right text-sm pl-2 pr-0.5">{thisRs.bpg.toFixed(1)}</td>
            <td>
              <StatCompareIcon thisStat={thisRs.bpg} thatStat={thatRs.bpg} />
            </td>
          </tr>

          <tr>
            <td className="text-left uppercase text-xs text-neutral-500 font-semibold">SPG</td>
            <td className="text-right text-sm pl-2 pr-0.5">{thisRs.spg.toFixed(1)}</td>
            <td>
              <StatCompareIcon thisStat={thisRs.spg} thatStat={thatRs.spg} />
            </td>
          </tr>

          <tr>
            <td className="text-left uppercase text-xs text-neutral-500 font-semibold">TPG</td>
            <td className="text-right text-sm pl-2 pr-0.5">{thisRs.tpg.toFixed(1)}</td>
            <td>
              <StatCompareIcon thisStat={thisRs.tpg} thatStat={thatRs.tpg} reverse />
            </td>
          </tr>

          <tr>
            <td className="text-left uppercase text-xs text-neutral-500 font-semibold">MPG</td>
            <td className="text-right text-sm pl-2 pr-0.5">{thisRs.mpg.toFixed(1)}</td>
            <td>
              <StatCompareIcon thisStat={thisRs.mpg} thatStat={thatRs.mpg} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
