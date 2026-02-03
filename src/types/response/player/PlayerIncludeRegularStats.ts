import { Player, PlayerStats } from '@prisma/client';

export interface PlayerIncludeRegularStats extends Player {
  regularStats: PlayerStats;
}
