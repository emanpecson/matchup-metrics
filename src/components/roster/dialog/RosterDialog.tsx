import { Player } from '@prisma/client';
import { Dialog, DialogContent } from '../../ui/dialog';
import RosterSlot, { RosterSlotState } from '../slot/RosterSlot';
import { RosterBuilder, RosterBuilderSlot } from '@/types/RosterBuilder';
import { Dispatch, SetStateAction } from 'react';
import PlayerComparePopup from '@/components/player/compare/PlayerComparePopup';
import StagedPlayer from '../../player/PlayerStaged';
import Tip from '@/components/Tip';

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
