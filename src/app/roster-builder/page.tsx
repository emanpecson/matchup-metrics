'use client';

import PlayerIndex from '@/components/player/PlayerIndex';
import RosterDialog from '@/components/roster/dialog/RosterDialog';
import RosterSlot, { RosterSlotState } from '@/components/roster/slot/RosterSlot';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { PlayerIncludeRegularStats } from '@/types/response/player/PlayerIncludeRegularStats';
import { RosterBuilder, RosterBuilderSlot } from '@/types/RosterBuilder';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RosterBuilderPage() {
  const [rosterInstance, setRosterInstance] = useState(new RosterBuilder());
  const [playerToAdd, setPlayerToAdd] = useState<PlayerIncludeRegularStats | null>(null);
  const [rosterDialogIsOpen, setRosterDialogIsOpen] = useState(false);
  const router = useRouter();

  /**
   * Button component that opens the roster-dialog to add a new player.
   * @returns {JSX.Element}
   */
  const RosterAddButton = (): JSX.Element => {
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

  /**
   * Removes a player at a given roster slot id.
   * @param {number} slotId - Removal position
   */
  const handleRosterSlotRemove = (slotId: number) => {
    const tempRoster = new RosterBuilder(rosterInstance);
    tempRoster.updateBySlotId(slotId, null);
    setRosterInstance(tempRoster);
  };

  /**
   * Creates a roster in the database from player ids.
   */
  // const handleCreateRoster = async () => {
  //   const playerIds: string[] = rosterInstance.getRoster().map((slot) => slot.player!.id);

  //   const res = await fetch('/api/roster', { method: 'POST', body: JSON.stringify(playerIds) });
  //   if (!res.ok) {
  //     console.log('Error');
  //   } else {
  //     router.push('/');
  //   }
  // };

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
        <PlayerIndex
          rowCount={8}
          FooterElement={RosterAddButton}
          setFocusPlayer={setPlayerToAdd}
          disabledPlayerIds={rosterInstance
            .getRoster()
            .filter((slot) => slot.player)
            .map((slot) => slot.player!.id)}
        />
      </div>

      <RosterDialog
        roster={rosterInstance}
        setRoster={setRosterInstance}
        isOpen={rosterDialogIsOpen}
        setIsOpen={setRosterDialogIsOpen}
        playerToAdd={playerToAdd as PlayerIncludeRegularStats}
      />
    </>
  );
}
