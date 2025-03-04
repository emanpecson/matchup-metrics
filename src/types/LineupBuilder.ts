import positions from '@/data/positions';
import { PlayerIncludeRegularStats } from './response/player/PlayerIncludeRegularStats';
import { PlayerStats } from '@prisma/client';
import { yahooFantasyPpg } from '@/utils/fantasyConverter';

export interface LineupStats {
  fantasyAvg: number;
  fantasySum: number;
  pointsAvg: number;
  pointsSum: number;
  assistsAvg: number;
  assistsSum: number;
  reboundsAvg: number;
  reboundsSum: number;
  stealsAvg: number;
  stealsSum: number;
  blocksAvg: number;
  blocksSum: number;
  turnoversAvg: number;
  turnoversSum: number;
  minutesAvg: number;
  minutesSum: number;
  plusMinusAvg: number;
  plusMinusSum: number;
  fgPct: number;
  fg3Pct: number;
  ftPct: number;
}

export interface LineupBuilderSlot {
  player: PlayerIncludeRegularStats | null;
  lineupPosition: keyof typeof positions;
  id: number;
}

export class LineupBuilder {
  private guard1: LineupBuilderSlot;
  private guard2: LineupBuilderSlot;
  private forward1: LineupBuilderSlot;
  private forward2: LineupBuilderSlot;
  private center: LineupBuilderSlot;

  constructor(lineup?: LineupBuilder) {
    this.guard1 = lineup?.guard1 ?? { player: null, lineupPosition: 'G', id: 1 };
    this.guard2 = lineup?.guard2 ?? { player: null, lineupPosition: 'G', id: 2 };
    this.forward1 = lineup?.forward1 ?? { player: null, lineupPosition: 'F', id: 3 };
    this.forward2 = lineup?.forward2 ?? { player: null, lineupPosition: 'F', id: 4 };
    this.center = lineup?.center ?? { player: null, lineupPosition: 'C', id: 5 };
  }

  public getLineup = () => {
    return [this.guard1, this.guard2, this.forward1, this.forward2, this.center];
  };

  public getSize = () => {
    return this.getLineup().filter((slot) => slot.player).length;
  };

  public updateBySlotId = (slotId: number, player: PlayerIncludeRegularStats | null) => {
    for (const slot of this.getLineup()) {
      if (slot.id === slotId) {
        slot.player = player;
        return this;
      }
    }
    return this;
  };

  public isFull = () => {
    if (!this.guard1.player) return false;
    if (!this.guard2.player) return false;
    if (!this.forward1.player) return false;
    if (!this.forward2.player) return false;
    if (!this.center.player) return false;
    return true;
  };

  public getLineupStats = (): LineupStats => {
    const stats: LineupStats = {
      fantasyAvg: 0,
      fantasySum: 0,
      pointsAvg: 0,
      pointsSum: 0,
      assistsAvg: 0,
      assistsSum: 0,
      reboundsAvg: 0,
      reboundsSum: 0,
      stealsAvg: 0,
      stealsSum: 0,
      blocksAvg: 0,
      blocksSum: 0,
      minutesAvg: 0,
      minutesSum: 0,
      turnoversAvg: 0,
      turnoversSum: 0,
      plusMinusAvg: 0,
      plusMinusSum: 0,
      fgPct: 0,
      fg3Pct: 0,
      ftPct: 0,
    };

    const slots = this.getLineup().filter((slot) => slot.player);
    let fgPctSum = 0;
    let fg3PctSum = 0;
    let ftPctSum = 0;

    for (const slot of slots) {
      if (slot.player) {
        const rs = slot.player.regularStats;

        stats.fantasySum += Number(yahooFantasyPpg(rs));
        stats.pointsSum += rs.ppg;
        stats.assistsSum += rs.apg;
        stats.reboundsSum += rs.rpg;
        stats.stealsSum += rs.spg;
        stats.blocksSum += rs.bpg;
        stats.turnoversSum += rs.tpg;
        stats.minutesSum += rs.mpg;
        stats.plusMinusSum += rs.plusMinus;
        fgPctSum += rs.fgPct;
        fg3PctSum += rs.fg3Pct;
        ftPctSum += rs.ftPct;
      }
    }

    stats.fantasyAvg = stats.fantasySum / slots.length;
    stats.pointsAvg = stats.pointsSum / slots.length;
    stats.assistsAvg = stats.assistsSum / slots.length;
    stats.reboundsAvg = stats.reboundsSum / slots.length;
    stats.stealsAvg = stats.stealsSum / slots.length;
    stats.blocksAvg = stats.blocksSum / slots.length;
    stats.turnoversAvg = stats.turnoversSum / slots.length;
    stats.minutesAvg = stats.minutesSum / slots.length;
    stats.plusMinusAvg = stats.plusMinusSum / slots.length;
    stats.fgPct = fgPctSum / slots.length;
    stats.fg3Pct = fg3PctSum / slots.length;
    stats.ftPct = ftPctSum / slots.length;

    return stats;
  };
}
