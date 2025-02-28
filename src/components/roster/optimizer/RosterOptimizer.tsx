import { Button } from '@/components/ui/button';
import { GameDayIncludeGames } from '@/types/response/gameDay/GameDayIncludeGames';
import { PlayerIncludeRegularStats } from '@/types/response/player/PlayerIncludeRegularStats';
import { RosterIncludePlayers } from '@/types/response/roster/RosterIncludePlayers';
import { RosterBuilder, RosterBuilderSlot } from '@/lib/RosterBuilder';
import { yahooFantasyPpg } from '@/utils/fantasyConverter';

interface OptimizerProps {
  roster: RosterIncludePlayers;
  date: Date;
}

export default function RosterOptimizer(props: OptimizerProps) {
  const optimize = async (roster: RosterIncludePlayers) => {
    const res = await fetch(`/api/game-day?date=${new Date('2024-10-30').toISOString()}`, {
      method: 'GET',
    });
    const gameDay = (await res.json()) as GameDayIncludeGames;
    console.log('game-day:', gameDay);

    const teamsPlaying = new Set<string>();
    for (const game of gameDay.games) {
      if (game.awayTeam) teamsPlaying.add(game.awayTeam.abbreviation);
      if (game.homeTeam) teamsPlaying.add(game.homeTeam.abbreviation);
    }

    const playersPlaying: PlayerIncludeRegularStats[] = [];
    for (const player of roster.players) {
      if (teamsPlaying.has(player.teamAbbreviation)) playersPlaying.push(player);
    }
    console.log('playing:', playersPlaying);

    const rosterBuilder = new RosterBuilder();

    // for each player, find an available spot
    for (const player of playersPlaying) {
      let placed = false;
      const potentialSlots: RosterBuilderSlot[] = [];
      console.log('player:', player.name);

      for (const slot of rosterBuilder.getRoster()) {
        if (player.position.includes(slot.rosterPosition)) {
          if (!slot.player) {
            console.log(`${player.name} added to [${slot.rosterPosition}] empty slot`);
            rosterBuilder.updateBySlotId(slot.id, player);
            placed = true;
            break;
          } else if (yahooFantasyPpg(slot.player.regularStats) < yahooFantasyPpg(player.regularStats)) {
            potentialSlots.push(slot);
          }
        }
      }

      // try overwriting
      // if (!placed)
    }
    rosterBuilder.printRoster();
    // for (const player of playersPlaying) {
    // 	if (player.position.includes())
    // }
  };

  return <Button onClick={() => optimize(props.roster)}>click me pls</Button>;
}
