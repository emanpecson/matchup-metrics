'use client';

import LineupDialog from '@/components/lineup/dialog/LineupDialog';
import LineupCompare from '@/components/player/compare/LineupCompare';
import PlayerIndex from '@/components/player/PlayerIndex';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { LineupBuilder } from '@/types/LineupBuilder';
import { PlayerIncludeRegularStats } from '@/types/response/player/PlayerIncludeRegularStats';
import { useState } from 'react';

export default function ComparePage() {
  const [playerToAdd, setPlayerToAdd] = useState<PlayerIncludeRegularStats | null>(null);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const [lineup1, setLineup1] = useState(new LineupBuilder());
  const [lineup2, setLineup2] = useState(new LineupBuilder());

  const disabledPlayerIds = lineup1
    .getLineup()
    .concat(lineup2.getLineup())
    .filter((slot) => slot.player)
    .map((slot) => slot.player!.id);

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
            setDialogIsOpen(true);
            setPlayerToAdd;
          }}
        >
          <p>Add to lineup</p>
        </Button>
      </DialogClose>
    );
  };

  return (
    <div className="w-full lg:pl-16">
      <div className="space-y-1">
        <LineupCompare lineup1={lineup1} setLineup1={setLineup1} lineup2={lineup2} setLineup2={setLineup2} />
        <PlayerIndex
          rowCount={6}
          setFocusPlayer={setPlayerToAdd}
          FooterElement={RosterAddButton}
          disabledPlayerIds={disabledPlayerIds}
        />
      </div>

      <LineupDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        lineup1={lineup1}
        setLineup1={setLineup1}
        lineup2={lineup2}
        setLineup2={setLineup2}
        playerToAdd={playerToAdd!}
      />
    </div>
  );
}
