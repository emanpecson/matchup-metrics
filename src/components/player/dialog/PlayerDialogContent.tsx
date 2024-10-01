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
            <MainStat label={'PPG'} stat={rs.ppg} />
            <MainStat label={'APG'} stat={rs.apg} />
            <MainStat label={'RPG'} stat={rs.rpg} />
          </div>
          <div className="divide-y">
            <Stat label="Steals (SPG)" stat={rs.spg} />
            <Stat label="Blocks (BPG)" stat={rs.bpg} />
            <Stat label="Turnovers (TPG)" stat={rs.tpg} />
            <Stat label="Minutes (MPG)" stat={rs.mpg} />
            <Stat label="Field Goal Pct. (FG%)" stat={`${rs.fgPct}%`} />
            <Stat label="Three Point Pct. (3P%)" stat={`${rs.fg3Pct}%`} />
            <Stat label="Free Throw Pct. (FT%)" stat={`${rs.ftPct}%`} />
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
