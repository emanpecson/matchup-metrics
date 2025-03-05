'use client';

import InlineImage from '@/components/InlineImage';
import LineupDialog from '@/components/lineup/dialog/LineupDialog';
import LineupCompare from '@/components/player/compare/LineupCompare';
import PlayerCompare from '@/components/player/compare/PlayerCompare';
import PlayerIndex from '@/components/player/PlayerIndex';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { LineupBuilder } from '@/types/LineupBuilder';
import { PlayerIncludeRegularStats } from '@/types/response/player/PlayerIncludeRegularStats';
import { getPlayerPhotoUrl } from '@/utils/getPhotoUrl';
import { Dispatch, SetStateAction, useState } from 'react';

export default function ComparePage() {
  const [playerToAdd, setPlayerToAdd] = useState<PlayerIncludeRegularStats | null>(null);
  const [player1, setPlayer1] = useState<PlayerIncludeRegularStats | null>(null);
  const [player2, setPlayer2] = useState<PlayerIncludeRegularStats | null>(null);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const [lineup1, setLineup1] = useState(new LineupBuilder());
  const [lineup2, setLineup2] = useState(new LineupBuilder());

  const disabledPlayerIds = lineup1
    .getLineup()
    .concat(lineup2.getLineup())
    .filter((slot) => slot.player)
    .map((slot) => slot.player!.id);

  /**
   * Roster buttons to set the focused player to player 1 or 2
   * @returns {JSX.Element}
   */
  const AddPlayerButtons = (): JSX.Element => {
    return (
      <div className="flex space-x-2">
        <DialogClose>
          <Button variant="outline" onClick={() => setPlayer1(playerToAdd)}>
            <InlineImage src={getPlayerPhotoUrl(player1?.nbaId ?? '')} rounded alt="player-img">
              Set player 1
            </InlineImage>
          </Button>
        </DialogClose>
        <DialogClose>
          <Button variant="outline" onClick={() => setPlayer2(playerToAdd)}>
            <InlineImage src={getPlayerPhotoUrl(player2?.nbaId ?? '')} rounded alt="player-img">
              Set player 2
            </InlineImage>
          </Button>
        </DialogClose>
      </div>
    );
  };

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

  /**
   * Removes a player at a given roster slot id.
   * @param {number} slotId - Removal position
   */
  const handleLineupSlotRemove = (
    lineup: LineupBuilder,
    setLineup: Dispatch<SetStateAction<LineupBuilder>>,
    slotId: number
  ) => {
    const tempLineup = new LineupBuilder(lineup);
    tempLineup.updateBySlotId(slotId, null);
    setLineup(tempLineup);
  };

  return (
    <>
      <div className="space-y-1">
        {/* <PlayerCompare player1={player1} player2={player2} /> */}
        <LineupCompare lineup1={lineup1} setLineup1={setLineup1} lineup2={lineup2} setLineup2={setLineup2} />
        <PlayerIndex
          rowCount={8}
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
    </>
  );
}
