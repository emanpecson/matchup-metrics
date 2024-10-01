import { Player, PlayerStats, Team } from '@prisma/client';

export interface PlayerIncludeRegularStats extends Player {
  regularStats: PlayerStats;
}
