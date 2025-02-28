import { Game, Team } from '@prisma/client';

export interface GameIncludeTeams extends Game {
  homeTeam?: Team;
  awayTeam?: Team;
}
