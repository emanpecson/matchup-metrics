import { Dialog, DialogContent } from '../../ui/dialog';
import RosterSlot, { RosterSlotState } from '../slot/RosterSlot';
import { RosterBuilder, RosterBuilderSlot } from '@/types/RosterBuilder';
import { Dispatch, SetStateAction, useState } from 'react';
import StagedPlayer from '../../player/PlayerStaged';
import Tip from '@/components/Tip';
import { PlayerIncludeRegularStats } from '@/types/response/player/PlayerIncludeRegularStats';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import PlayerStatsCompareSample from '@/components/player/compare/PlayerStatsCompareSample';

interface RosterDialogProps {
  roster: RosterBuilder;
  setRoster: Dispatch<SetStateAction<RosterBuilder>>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  playerToAdd: PlayerIncludeRegularStats | null;
}

export default function RosterDialog(props: RosterDialogProps) {
  const [hoveringSlotId, setHoveringSlotId] = useState<number | null>(null);

  const handleOverwrite = (slotId: number) => {
    const tempRoster = new RosterBuilder(props.roster);
    tempRoster.updateBySlotId(slotId, props.playerToAdd);
    props.setRoster(tempRoster);
    props.setIsOpen(false);
  };

  const tip =
    `Choose a roster spot for ${props.playerToAdd?.name}. ` +
    `You can select an empty slot or replace a currently-filled slot. ` +
    `Note that the player position and roster position must match.`;

  return (
    <Dialog open={props.isOpen} onOpenChange={props.setIsOpen}>
      <DialogContent className="max-w-4xl" hideClose>
        {props.playerToAdd && (
          <div className="flex flex-col place-items-center">
            <div className="absolute -top-[11.5rem]">
              <StagedPlayer player={props.playerToAdd} />
            </div>
            <Tip content={tip} />

            <div className="flex space-x-6 pt-10">
              {props.roster.getRoster().map((slot: RosterBuilderSlot) => {
                const isValidPosition = props.playerToAdd && props.playerToAdd.position.includes(slot.rosterPosition);
                let state = RosterSlotState.ADD;
                if (!isValidPosition) state = RosterSlotState.DISABLE;
                else if (slot.player) state = RosterSlotState.SWAP;

                const Slot = () => {
                  return (
                    <RosterSlot
                      key={slot.id}
                      player={slot.player}
                      position={slot.rosterPosition}
                      state={state}
                      onClick={state === RosterSlotState.DISABLE ? undefined : () => handleOverwrite(slot.id)}
                    />
                  );
                };

                if (slot.player && props.playerToAdd && state !== RosterSlotState.DISABLE) {
                  return (
                    <TooltipProvider>
                      <Tooltip delayDuration={0} open={slot.id === hoveringSlotId}>
                        <TooltipTrigger
                          onMouseOver={() => setHoveringSlotId(slot.id)}
                          onMouseLeave={() => setHoveringSlotId(null)}
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
              })}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
