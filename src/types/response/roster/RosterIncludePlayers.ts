import { Roster } from '@prisma/client';
import { PlayerIncludeRegularStats } from '../player/PlayerIncludeRegularStats';

export interface RosterIncludePlayers extends Roster {
  players: PlayerIncludeRegularStats[];
}
