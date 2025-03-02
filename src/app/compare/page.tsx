'use client';

import InlineImage from '@/components/InlineImage';
import PlayerCompare from '@/components/player/compare/PlayerCompare';
import PlayerIndex from '@/components/player/PlayerIndex';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { PlayerIncludeRegularStats } from '@/types/response/player/PlayerIncludeRegularStats';
import { getPlayerPhotoUrl } from '@/utils/getPhotoUrl';
import { useState } from 'react';

export default function ComparePage() {
  const [playerToAdd, setPlayerToAdd] = useState<PlayerIncludeRegularStats | null>(null);
  const [player1, setPlayer1] = useState<PlayerIncludeRegularStats | null>(null);
  const [player2, setPlayer2] = useState<PlayerIncludeRegularStats | null>(null);

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

  return (
    <div className="space-y-1">
      <PlayerCompare player1={player1} player2={player2} />
      <PlayerIndex rowCount={4} setFocusPlayer={setPlayerToAdd} FooterElement={AddPlayerButtons} />
    </div>
  );
}
