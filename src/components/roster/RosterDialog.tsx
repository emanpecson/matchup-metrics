import { Player } from '@prisma/client';
import { Dialog, DialogContent } from '../ui/dialog';
import RosterItem from './RosterItem';
import { RosterBuilder, RosterSlot } from '@/types/RosterBuilder';
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
  const handleAdd = (slotId: number) => {
    const tempRoster = new RosterBuilder(props.roster);
    tempRoster.updateBySlotId(slotId, props.playerToAdd);
    props.setRoster(tempRoster);
    props.setIsOpen(false);
  };

  const handleRemove = (slotId: number) => {
    const tempRoster = new RosterBuilder(props.roster);
    tempRoster.updateBySlotId(slotId, null);
    props.setRoster(tempRoster);
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
              {props.roster.getRoster().map((slot: RosterSlot) => {
                const isValidPosition = props.playerToAdd && props.playerToAdd.position.includes(slot.rosterPosition);

                return (
                  <RosterItem
                    key={slot.id}
                    player={slot.player}
                    position={slot.rosterPosition}
                    onAdd={!slot.player && isValidPosition ? () => handleAdd(slot.id) : undefined}
                    onRemove={() => handleRemove(slot.id)}
                    invalidPosition={!isValidPosition}
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
