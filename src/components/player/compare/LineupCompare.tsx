import { LineupBuilder } from '@/types/LineupBuilder';
import LineupStatsCompare from './LineupStatsCompare';
import LineupSlot, { LineupSlotState } from '@/components/lineup/slot/LineupSlot';
import { Dispatch, SetStateAction } from 'react';
import { cn } from '@/lib/utils';

interface LineupCompareProps {
  lineup1: LineupBuilder;
  setLineup1: Dispatch<SetStateAction<LineupBuilder>>;
  lineup2: LineupBuilder;
  setLineup2: Dispatch<SetStateAction<LineupBuilder>>;
}

export default function LineupCompare(props: LineupCompareProps) {
  /**
   * Removes a player at a given lineup slot id.
   * @param {LineupBuilder} - Lineup to perform removal on
   * @param {Dispatch<SetStateAction<LineupBuilder>>} - Updates lineup reactively
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
   * @returns {JSX.Element}
   */
  const DisplayLineup = ({
    lineup,
    setLineup,
  }: {
    lineup: LineupBuilder;
    setLineup: Dispatch<SetStateAction<LineupBuilder>>;
  }) => {
    return (
      <div
        className={cn(
          'flex flex-wrap w-[60rem] justify-center place-items-center',
          lineup.getSize() <= 4 ? 'gap-9' : 'gap-5'
        )}
      >
        {lineup
          .getLineup()
          .filter((slot) => slot.player)
          .map((slot) => (
            <LineupSlot
              player={slot.player}
              key={slot.id}
              position={slot.lineupPosition}
              state={slot.player ? LineupSlotState.REMOVE : LineupSlotState.STATIC}
              onClick={slot.player ? () => handleLineupSlotRemove(lineup, setLineup, slot.id) : undefined}
              size={lineup.getSize() === 1 ? 'lg' : lineup.getSize() <= 4 ? 'md' : 'sm'}
            />
          ))}
      </div>
    );
  };

  return (
    <div className="flex space-x-2 rounded-xl p-4 w-full border mt-8">
      <DisplayLineup lineup={props.lineup1} setLineup={props.setLineup1} />
      <LineupStatsCompare lineup1={props.lineup1} lineup2={props.lineup2} />
      <DisplayLineup lineup={props.lineup2} setLineup={props.setLineup2} />
    </div>
  );
}
