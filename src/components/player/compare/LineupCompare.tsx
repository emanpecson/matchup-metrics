import { LineupBuilder } from '@/types/LineupBuilder';
import LineupStatsCompare from './LineupStatsCompare';
import LineupSlot, { LineupSlotState } from '@/components/lineup/slot/LineupSlot';
import { Dispatch, SetStateAction } from 'react';
import { cn } from '@/lib/utils';
import { reformatHeight, reformatPosition } from '@/utils/reformatString';
import positions from '@/data/positions';
import Image from 'next/image';
import { getTeamLogoUrl } from '@/utils/getPhotoUrl';
import teams, { TeamInfo } from '@/data/teams';
import PlayerHeadshot from '../PlayerHeadshot';

interface LineupCompareProps {
  lineup1: LineupBuilder;
  setLineup1: Dispatch<SetStateAction<LineupBuilder>>;
  lineup2: LineupBuilder;
  setLineup2: Dispatch<SetStateAction<LineupBuilder>>;
}

export default function LineupCompare(props: LineupCompareProps) {
  /**
   * Removes a player at a given lineup slot id.
   * @param {LineupBuilder} lineup - Lineup to perform removal on
   * @param {Dispatch<SetStateAction<LineupBuilder>>} setLineup - Updates lineup reactively
   * @param {number} slotId - Removal position
   */
  const handleLineupSlotRemove = (
    lineup: LineupBuilder,
    setLineup: Dispatch<SetStateAction<LineupBuilder>>,
    slotId: number
  ) => {
    const tempRoster = new LineupBuilder(lineup);
    tempRoster.updateBySlotId(slotId, null);
    setLineup(tempRoster);
  };

  /**
   * Displays players within lineup dynamically
   * @param param0 - Lineup to display
   * @param param1 - Updates lineup
   * @returns {JSX.Element}
   */
  const DisplayLineup = (param: {
    lineup: LineupBuilder;
    setLineup: Dispatch<SetStateAction<LineupBuilder>>;
  }): JSX.Element => {
    const slots = param.lineup.getLineup().filter((slot) => slot.player);

    // if no players
    if (param.lineup.getSize() === 0) {
      return (
        <div className="flex place-items-center px-16">
          <div className="space-y-0.5">
            <PlayerHeadshot player={null} size="lg" />
            <h3 className="font-extrabold text-xl text-center text-neutral-500">Add player</h3>
          </div>
        </div>
      );
    }

    // if single player
    if (param.lineup.getSize() === 1) {
      return (
        <div className="flex place-items-center px-16">
          {slots.map((slot) => {
            const team = teams[slot.player!.teamAbbreviation as keyof typeof teams];
            return (
              <div className="space-y-0.5">
                <LineupSlot
                  player={slot.player}
                  key={slot.id}
                  position={slot.lineupPosition}
                  state={LineupSlotState.REMOVE}
                  onClick={() => handleLineupSlotRemove(param.lineup, param.setLineup, slot.id)}
                  size="lg"
                  hideCaption
                  hideTeam
                />
                <h3 className="font-extrabold text-xl text-center text-neutral-800 dark:text-neutral-200">
                  {slot.player!.name}
                </h3>
                <div className="flex space-x-1 text-center justify-center font-medium text-nowrap">
                  <span>{reformatHeight(slot.player!.height)},</span>
                  <span>{slot.player!.weight},</span>
                  <span>{reformatPosition(slot.player!.position as keyof typeof positions)}</span>
                </div>
                <div className="flex space-x-1 justify-center font-medium place-items-center">
                  <Image
                    src={getTeamLogoUrl(team.abbreviation)}
                    alt={team.abbreviation}
                    height={28}
                    width={28}
                    unoptimized
                  />
                  <span>{team.city}</span>
                  <span>{team.name}</span>
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    // otherwise, display lineup
    return (
      <div
        className={cn(
          'flex flex-wrap w-[60rem] justify-center place-items-center',
          param.lineup.getSize() <= 4 ? 'gap-9' : 'gap-5'
        )}
      >
        {slots.map((slot) => (
          <LineupSlot
            player={slot.player}
            key={slot.id}
            position={slot.lineupPosition}
            state={LineupSlotState.REMOVE}
            onClick={() => handleLineupSlotRemove(param.lineup, param.setLineup, slot.id)}
            size={param.lineup.getSize() <= 4 ? 'md' : 'sm'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex space-x-2 rounded-xl p-4 w-full border">
      <DisplayLineup lineup={props.lineup1} setLineup={props.setLineup1} />
      <LineupStatsCompare lineup1={props.lineup1} lineup2={props.lineup2} />
      <DisplayLineup lineup={props.lineup2} setLineup={props.setLineup2} />
    </div>
  );
}
