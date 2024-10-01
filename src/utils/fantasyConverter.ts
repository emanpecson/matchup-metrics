import { PlayerStats } from '@prisma/client';

export const yahooFantasyPpg = (stats: PlayerStats): string => {
  let fppg = 0;
  fppg += stats.ppg * 1.0;
  fppg += stats.rpg * 1.2;
  fppg += stats.apg * 1.5;
  fppg += stats.spg * 3.0;
  fppg += stats.bpg * 3.0;
  fppg -= stats.tpg * 1.0;
  return fppg.toFixed(1);
};
