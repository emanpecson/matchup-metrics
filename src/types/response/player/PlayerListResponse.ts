import { PlayerIncludeRegularStats } from './PlayerIncludeRegularStats';

export interface PlayerListResponse {
  players: PlayerIncludeRegularStats[];
  playersCount: number;
}
