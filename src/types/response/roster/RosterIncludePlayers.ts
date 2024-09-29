import { Player, Roster } from '@prisma/client';

export interface RosterIncludePlayers extends Roster {
  players: Player[];
}
