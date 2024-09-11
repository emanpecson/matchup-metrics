import { Player } from '@prisma/client';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';
import RosterSlot, { RosterSlotState } from './slot/RosterSlot';
import { RosterBuilder, RosterBuilderSlot } from '@/types/RosterBuilder';
import { Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';
import { getPlayerPhotoUrl } from '@/utils/getPhotoUrl';

interface RosterDialogProps {
  roster: RosterBuilder;
  setRoster: Dispatch<SetStateAction<RosterBuilder>>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  playerToAdd: Player | null;
}

export default function RosterDialog(props: RosterDialogProps) {
  const handleOverwrite = (slotId: number) => {
    console.log('slotid:', slotId);
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
            <Image
              src={getPlayerPhotoUrl(props.playerToAdd.nbaId)}
              alt={props.playerToAdd.name}
              height={24}
              width={24}
              className="rounded-full object-cover h-24 w-24"
              unoptimized
            />

            <div className="flex space-x-6">
              {props.roster.getRoster().map((slot: RosterBuilderSlot) => {
                const isValidPosition = props.playerToAdd && props.playerToAdd.position.includes(slot.rosterPosition);
                let state = RosterSlotState.ADD;
                if (!isValidPosition) state = RosterSlotState.DISABLE;
                else if (slot.player) state = RosterSlotState.SWAP;

                return (
                  <RosterSlot
                    key={slot.id}
                    player={slot.player}
                    position={slot.rosterPosition}
                    state={state}
                    onClick={state === RosterSlotState.DISABLE ? undefined : () => handleOverwrite(slot.id)}
                  />
                );
              })}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
