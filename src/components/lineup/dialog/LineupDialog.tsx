import { Dialog, DialogContent } from '../../ui/dialog';
import LineupSlot, { LineupSlotState } from '../slot/LineupSlot';
import { Dispatch, SetStateAction, useState } from 'react';
import StagedPlayer from '../../player/PlayerStaged';
import Tip from '@/components/Tip';
import { PlayerIncludeRegularStats } from '@/types/response/player/PlayerIncludeRegularStats';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import PlayerStatsCompareSample from '@/components/player/compare/PlayerStatsCompareSample';
import { LineupBuilder, LineupBuilderSlot } from '@/types/LineupBuilder';

interface LineupDialogProps {
  lineup1: LineupBuilder;
  setLineup1: Dispatch<SetStateAction<LineupBuilder>>;
  lineup2: LineupBuilder;
  setLineup2: Dispatch<SetStateAction<LineupBuilder>>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  playerToAdd: PlayerIncludeRegularStats;
}

export default function LineupDialog(props: LineupDialogProps) {
  // const [hoveringSlotId, setHoveringSlotId] = useState<number | null>(null);
  const [hoveringSlotPlayerId, setHoveringSlotPlayerId] = useState<string | null>(null);

  const handleOverwrite = (
    lineup: LineupBuilder,
    setLineup: Dispatch<SetStateAction<LineupBuilder>>,
    slotId: number
  ) => {
    const tempLineup = new LineupBuilder(lineup);
    tempLineup.updateBySlotId(slotId, props.playerToAdd);
    setLineup(tempLineup);
    props.setIsOpen(false);
  };

  const tip =
    `Choose a roster spot for ${props.playerToAdd?.name}. ` +
    `You can select an empty slot or replace a currently-filled slot. ` +
    `Note that the player position and roster position must match.`;

  /**
   * Displays each lineup
   * @param {LineupBuilderSlot} param0 - Lineup slot
   * @returns {JSX.Element}
   */
  const DisplaySlot = ({
    lineup,
    setLineup,
    slot,
  }: {
    lineup: LineupBuilder;
    setLineup: Dispatch<SetStateAction<LineupBuilder>>;
    slot: LineupBuilderSlot;
  }) => {
    const isValidPosition = props.playerToAdd && props.playerToAdd.position.includes(slot.lineupPosition);
    let state = LineupSlotState.ADD;
    if (!isValidPosition) state = LineupSlotState.DISABLE;
    else if (slot.player) state = LineupSlotState.SWAP;

    const Slot = () => {
      return (
        <LineupSlot
          key={slot.id}
          player={slot.player}
          position={slot.lineupPosition}
          state={state}
          onClick={state === LineupSlotState.DISABLE ? undefined : () => handleOverwrite(lineup, setLineup, slot.id)}
        />
      );
    };

    if (slot.player && props.playerToAdd && state !== LineupSlotState.DISABLE) {
      return (
        <TooltipProvider>
          <Tooltip delayDuration={0} open={slot.player.id === hoveringSlotPlayerId}>
            <TooltipTrigger
              onMouseOver={() => setHoveringSlotPlayerId(slot.player!.id)}
              onMouseLeave={() => setHoveringSlotPlayerId(null)}
              asChild
            >
              <div>{Slot()}</div>
            </TooltipTrigger>
            <TooltipContent className="mr-12 mb-6">
              <PlayerStatsCompareSample thisPlayer={slot.player} thatPlayer={props.playerToAdd} />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    } else {
      return Slot();
    }
  };

  return (
    <Dialog open={props.isOpen} onOpenChange={props.setIsOpen}>
      <DialogContent className="max-w-4xl mt-20" hideClose>
        {props.playerToAdd && (
          <div className="flex flex-col place-items-center">
            <div className="absolute -top-[11.5rem]">
              <StagedPlayer player={props.playerToAdd} />
            </div>
            <Tip content={tip} />

            <div className="flex justify-between place-items-center space-x-4">
              <div className="flex flex-wrap gap-6 pt-8 w-1/2 justify-center">
                {props.lineup1.getLineup().map((slot: LineupBuilderSlot) => (
                  <DisplaySlot lineup={props.lineup1} setLineup={props.setLineup1} slot={slot} />
                ))}
              </div>

              <span className="text-5xl font-bold text-neutral-500">vs</span>

              <div className="flex flex-wrap gap-6 pt-8 w-1/2 justify-center">
                {props.lineup2.getLineup().map((slot: LineupBuilderSlot) => (
                  <DisplaySlot lineup={props.lineup2} setLineup={props.setLineup2} slot={slot} />
                ))}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
