import { Player } from '@prisma/client';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '../../ui/dialog';
import { Dispatch, SetStateAction } from 'react';
import teams from '@/data/teams';
import PlayerDialogHeader from './PlayerDialogHeader';
import PlayerDialogFooter from './PlayerDialogFooter';
import PlayerDialogContent from './PlayerDialogContent';

interface PlayerDialogProps {
  player: Player | null;
  setPlayer: Dispatch<SetStateAction<Player | null>>;
}

export default function PlayerDialog(props: PlayerDialogProps) {
  const teamInfo = teams[props.player?.team as keyof typeof teams];
  const primaryColor = props.player ? teamInfo.colors[0] : '';
  const secondaryColor = props.player ? teamInfo.colors[1] : '';

  const headerHeight = '10rem';
  const footerHeight = '4rem';

  return (
    <Dialog
      open={!!props.player}
      onOpenChange={(open) => {
        if (!open) props.setPlayer(null);
      }}
    >
      <DialogContent hideClose className="max-w-2xl">
        {props.player ? (
          <div>
            <PlayerDialogHeader
              player={props.player}
              headerHeight={headerHeight}
              teamInfo={teamInfo}
              primaryColor={primaryColor}
            />

            <PlayerDialogContent player={props.player} headerHeight={headerHeight} footerHeight={footerHeight} />

            <PlayerDialogFooter footerHeight={footerHeight} primaryColor={primaryColor} />
          </div>
        ) : (
          <div>Error: No data</div>
        )}
      </DialogContent>
    </Dialog>
  );
}
