import { Player } from '@prisma/client';
import { Dialog, DialogContent } from '../../ui/dialog';
import RosterSlot, { RosterSlotState } from '../slot/RosterSlot';
import { RosterBuilder, RosterBuilderSlot } from '@/types/RosterBuilder';
import { Dispatch, SetStateAction } from 'react';
import PlayerComparePopup from '@/components/player/compare/PlayerComparePopup';
import StagedPlayer from '../../player/PlayerStaged';

interface RosterDialogProps {
  roster: RosterBuilder;
  setRoster: Dispatch<SetStateAction<RosterBuilder>>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  playerToAdd: Player | null;
}

export default function RosterDialog(props: RosterDialogProps) {
  const handleOverwrite = (slotId: number) => {
    const tempRoster = new RosterBuilder(props.roster);
    tempRoster.updateBySlotId(slotId, props.playerToAdd);
    props.setRoster(tempRoster);
    props.setIsOpen(false);
  };

  return (
    <Dialog open={props.isOpen} onOpenChange={props.setIsOpen}>
      <DialogContent className="max-w-4xl" hideClose>
        {props.playerToAdd && (
          <div className="space-y-24 flex flex-col place-items-center">
            <StagedPlayer player={props.playerToAdd} />

            <div className="flex space-x-6">
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
                    <PlayerComparePopup thisPlayer={slot.player} thatPlayer={props.playerToAdd}>
                      <div>{Slot()}</div>
                    </PlayerComparePopup>
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
