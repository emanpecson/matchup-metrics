import { Player } from '@prisma/client';
import MainStat from './MainStat';
import Stat from './Stat';
import { reformatHeight, reformatPosition } from '@/utils/reformatString';
import positions from '@/data/positions';

export interface PlayerDialogContentProps {
  headerHeight: string;
  footerHeight: string;
  player: Player;
}

export default function PlayerDialogContent(props: PlayerDialogContentProps) {
  return (
    <div style={{ paddingTop: props.headerHeight, paddingBottom: props.footerHeight }}>
      <div className="divide-y divide-neutral-300 dark:divide-neutral-700">
        {/* stats info */}
        <div className="pb-4 space-y-4">
          <div className="flex space-x-3">
            <MainStat label={'Fantasy'} stat={props.player.fantasyPpg} />
            <MainStat label={'PPG'} stat={props.player.ppg} />
            <MainStat label={'APG'} stat={props.player.apg} />
            <MainStat label={'RPG'} stat={props.player.rpg} />
          </div>
          <div className="divide-y">
            <Stat label="Steals (SPG)" stat={props.player.spg} />
            <Stat label="Blocks (BPG)" stat={props.player.bpg} />
            <Stat label="Turnovers (TPG)" stat={props.player.tpg} />
            <Stat label="Minutes (MPG)" stat={props.player.mpg} />
            <Stat label="Field Goal Pct. (FG%)" stat={`${props.player.fgPct}%`} />
            <Stat label="Three Point Pct. (3P%)" stat={`${props.player.fg3Pct}%`} />
            <Stat label="Free Throw Pct. (FT%)" stat={`${props.player.ftPct}%`} />
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
