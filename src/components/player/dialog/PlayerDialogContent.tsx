import MainStat from './MainStat';
import Stat from './Stat';
import { reformatHeight, reformatPosition } from '@/utils/reformatString';
import positions from '@/data/positions';
import { PlayerIncludeRegularStats } from '@/types/response/player/PlayerIncludeRegularStats';
import { yahooFantasyPpg } from '@/utils/fantasyConverter';

export interface PlayerDialogContentProps {
  headerHeight: string;
  footerHeight: string;
  player: PlayerIncludeRegularStats;
}

export default function PlayerDialogContent(props: PlayerDialogContentProps) {
  const rs = props.player.regularStats;

  return (
    <div style={{ paddingTop: props.headerHeight, paddingBottom: props.footerHeight }}>
      <div className="divide-y divide-neutral-300 dark:divide-neutral-700">
        {/* stats info */}
        <div className="pb-4 space-y-4">
          <div className="flex space-x-3">
            <MainStat label={'Fantasy'} stat={yahooFantasyPpg(rs)} />
            <MainStat label={'PPG'} stat={rs.ppg.toFixed(1)} />
            <MainStat label={'APG'} stat={rs.apg.toFixed(1)} />
            <MainStat label={'RPG'} stat={rs.rpg.toFixed(1)} />
          </div>
          <div className="divide-y">
            <Stat label="Steals (SPG)" stat={rs.spg.toFixed(1)} />
            <Stat label="Blocks (BPG)" stat={rs.bpg.toFixed(1)} />
            <Stat label="Turnovers (TPG)" stat={rs.tpg.toFixed(1)} />
            <Stat label="Minutes (MPG)" stat={rs.mpg.toFixed(1)} />
            <Stat label="Field Goal Pct. (FG%)" stat={`${rs.fgPct.toFixed(1)}%`} />
            <Stat label="Three Point Pct. (3P%)" stat={`${rs.fg3Pct.toFixed(1)}%`} />
            <Stat label="Free Throw Pct. (FT%)" stat={`${rs.ftPct.toFixed(1)}%`} />
          </div>
        </div>
        {/* bio info */}
        <div className="pt-4 space-y-4">
          <div className="flex space-x-3">
            <MainStat label={'Position'} stat={reformatPosition(props.player.position as keyof typeof positions)} />
            <MainStat label={'Height'} stat={reformatHeight(props.player.height)} />
            <MainStat label={'Weight'} stat={props.player.weight} />
          </div>
          <div className="divide-y">
            <Stat label={'Age'} stat={props.player.age} />
            <Stat label={'Country'} stat={props.player.country} />
            <Stat label={'Last attended'} stat={props.player.lastAttended} />
          </div>
        </div>
      </div>
    </div>
  );
}
