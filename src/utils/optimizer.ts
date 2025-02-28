import { RosterBuilder, RosterBuilderSlot } from '@/lib/RosterBuilder';
import { GameDayIncludeGames } from '@/types/response/gameDay/GameDayIncludeGames';
import { PlayerIncludeRegularStats } from '@/types/response/player/PlayerIncludeRegularStats';
import { RosterIncludePlayers } from '@/types/response/roster/RosterIncludePlayers';
import { yahooFantasyPpg } from './fantasyConverter';
import { Queue } from '@/lib/Queue';

interface MinimumSlots {
  G: RosterBuilderSlot | null;
  F: RosterBuilderSlot | null;
  C: RosterBuilderSlot | null;
}

/**
 * Get teams playing as a set of their team abbreviations
 * @param {Date} date - Fetch gameDay based on this date query
 * @returns {Promise<Set<string>}
 */
const getTeamsPlayingAtDate = async (date: Date): Promise<Set<string>> => {
  const res = await fetch(`/api/game-day?date=${date.toISOString()}`, {
    method: 'GET',
  });
  const gameDay = (await res.json()) as GameDayIncludeGames;

  const teamsPlaying = new Set<string>();
  for (const game of gameDay.games) {
    if (game.awayTeam) teamsPlaying.add(game.awayTeam.abbreviation);
    if (game.homeTeam) teamsPlaying.add(game.homeTeam.abbreviation);
  }

  return teamsPlaying;
};

/**
 * Updates minimum slot by the given passed slot if necessary
 * @param {RosterBuilderSlot} slot - Current slot
 * @param {MinimumSlots} minSlots - Object of slots holding a player w/ the lowest fantasy stats
 */
const evaluateMinimumSlots = (slot: RosterBuilderSlot, minSlots: MinimumSlots): void => {
  const currStats = yahooFantasyPpg((slot.player as PlayerIncludeRegularStats).regularStats);
  if (slot.rosterPosition === 'G') {
    if (minSlots.G) {
      const minStats = yahooFantasyPpg((minSlots.G.player as PlayerIncludeRegularStats).regularStats);
      if (currStats < minStats) minSlots.G = slot;
    } else {
      minSlots.G = slot;
    }
  } else if (slot.rosterPosition === 'F') {
    if (minSlots.F) {
      const minStats = yahooFantasyPpg((minSlots.F.player as PlayerIncludeRegularStats).regularStats);
      if (currStats < minStats) minSlots.F = slot;
    } else {
      minSlots.F = slot;
    }
  } else {
    if (minSlots.C) {
      const minStats = yahooFantasyPpg((minSlots.C.player as PlayerIncludeRegularStats).regularStats);
      if (currStats < minStats) minSlots.C = slot;
    } else {
      minSlots.C = slot;
    }
  }
};

/**
 * If the player has multiple positions, they should evaluate across all positions
 * @param {PlayerIncludeRegularStats} player - Player to potentially overwrite with
 * @param {MinimumSlots} minSlots - Object of slots holding a player w/ the lowest fantasy stats
 * @returns Returns RosterBuilderSlot if player can overwrite minimum slot, or null otherwise
 */
const overwriteSlot = (player: PlayerIncludeRegularStats, minSlots: MinimumSlots): RosterBuilderSlot | null => {
  const thisStats = yahooFantasyPpg(player.regularStats);
  const slotsToOverwrite: RosterBuilderSlot[] = [];

  if (player.position.includes('G')) {
    if (minSlots.G && yahooFantasyPpg((minSlots.G.player as PlayerIncludeRegularStats).regularStats) < thisStats) {
      slotsToOverwrite.push(minSlots.G);
    }
  }

  if (player.position.includes('F')) {
    if (minSlots.F && yahooFantasyPpg((minSlots.F.player as PlayerIncludeRegularStats).regularStats) < thisStats) {
      slotsToOverwrite.push(minSlots.F);
    }
  }

  if (player.position.includes('C')) {
    if (minSlots.C && yahooFantasyPpg((minSlots.C.player as PlayerIncludeRegularStats).regularStats) < thisStats) {
      slotsToOverwrite.push(minSlots.C);
    }
  }

  let overwriteSlot: RosterBuilderSlot | null = null;
  let min = Infinity;
  for (const slot of slotsToOverwrite) {
    const stat = yahooFantasyPpg((slot.player as PlayerIncludeRegularStats).regularStats) as unknown as number;
    if (stat < min) {
      overwriteSlot = slot;
      min = stat;
    }
  }

  return overwriteSlot;
};

//-------------------------------------------------------------------------------------------------//

export const optimize = async (roster: RosterIncludePlayers, date: Date) => {
  const minimumSlots: MinimumSlots = {
    G: null,
    F: null,
    C: null,
  };

  const rosterBuilder = new RosterBuilder();

  // filter players who are on team playing at the given date
  const teams = await getTeamsPlayingAtDate(date);
  const playerRotation = new Queue(roster.players.filter((x) => teams.has(x.teamAbbreviation)));

  while (!playerRotation.isEmpty()) {
    // get player
    const player = playerRotation.dequeue();

    // try to put player in a slot
    for (const slot of rosterBuilder.getRoster()) {
      // position matches
      if (player.position.includes(slot.rosterPosition)) {
        // place in empty slot
        if (!slot.player) {
          rosterBuilder.updateBySlotId(slot.id, player);
          evaluateMinimumSlots(slot, minimumSlots);
          break;
        } else {
          // or overwrite a slot
          const tempSlot = overwriteSlot(player, minimumSlots);
          if (tempSlot) {
            // place overwritten player back in rotation
            const overwritePlayer = tempSlot.player as PlayerIncludeRegularStats;
            playerRotation.enqueue(overwritePlayer);

            rosterBuilder.updateBySlotId(tempSlot.id, player);
            evaluateMinimumSlots(tempSlot, minimumSlots);
            break;
          }
          // * NOTE: We don't break in else case b/c player can still
          // * check if next slot is empty (i.e. Guard + Forward)
        }
      }
    }
  }

  rosterBuilder.printRoster();
};
