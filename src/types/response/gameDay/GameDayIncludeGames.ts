import { GameDay } from '@prisma/client';
import { GameIncludeTeams } from '../game/GameIncludeTeams';

export interface GameDayIncludeGames extends GameDay {
  games: GameIncludeTeams[];
}
