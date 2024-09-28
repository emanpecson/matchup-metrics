'use client';

import PlayerIndex from '@/components/player/PlayerIndex';
import RosterDialog from '@/components/roster/dialog/RosterDialog';
import RosterSlot, { RosterSlotState } from '@/components/roster/slot/RosterSlot';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { RosterBuilder, RosterBuilderSlot } from '@/types/RosterBuilder';
import { Player } from '@prisma/client';
import { useState } from 'react';

export default function RosterBuilderPage() {
  const [rosterInstance, setRosterInstance] = useState(new RosterBuilder());
  const [playerToAdd, setPlayerToAdd] = useState<Player | null>(null);
  const [rosterDialogIsOpen, setRosterDialogIsOpen] = useState(false);

  const addToRoster = () => {
    return (
      <DialogClose>
        <Button
          variant={'outline'}
          onClick={() => {
            setRosterDialogIsOpen(true);
            setPlayerToAdd;
          }}
        >
          <p>Add to roster</p>
        </Button>
      </DialogClose>
    );
  };

  const handleRosterSlotRemove = (slotId: number) => {
    const tempRoster = new RosterBuilder(rosterInstance);
    tempRoster.updateBySlotId(slotId, null);
    setRosterInstance(tempRoster);
  };

  return (
    <>
      <div className="space-y-8">
        <div className="flex space-x-6 justify-center">
          {rosterInstance.getRoster().map((slot: RosterBuilderSlot) => (
            <RosterSlot
              key={slot.id}
              player={slot.player}
              position={slot.rosterPosition}
              state={slot.player ? RosterSlotState.REMOVE : RosterSlotState.STATIC}
              onClick={slot.player ? () => handleRosterSlotRemove(slot.id) : undefined}
            />
          ))}
        </div>
        <PlayerIndex rowCount={8} FooterElement={addToRoster} setFocusPlayer={setPlayerToAdd} roster={rosterInstance} />
      </div>

      <RosterDialog
        roster={rosterInstance}
        setRoster={setRosterInstance}
        isOpen={rosterDialogIsOpen}
        setIsOpen={setRosterDialogIsOpen}
        playerToAdd={playerToAdd as Player}
      />
    </>
  );
}
