import { Dialog, DialogContent } from '../../ui/dialog';
import { Dispatch, SetStateAction } from 'react';
import teams from '@/data/teams';
import PlayerDialogHeader from './PlayerDialogHeader';
import PlayerDialogFooter from './PlayerDialogFooter';
import PlayerDialogContent from './PlayerDialogContent';
import { PlayerIncludeRegularStats } from '@/types/response/player/PlayerIncludeRegularStats';

interface PlayerDialogProps {
  player: PlayerIncludeRegularStats | null;
  setPlayer: Dispatch<SetStateAction<PlayerIncludeRegularStats | null>>;
  FooterElement?: () => JSX.Element;
}

export default function PlayerDialog(props: PlayerDialogProps) {
  const teamInfo = teams[props.player?.teamAbbreviation as keyof typeof teams];

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
              primaryColor={teamInfo.primaryColor}
            />

            <PlayerDialogContent player={props.player} headerHeight={headerHeight} footerHeight={footerHeight} />

            <PlayerDialogFooter
              footerHeight={footerHeight}
              primaryColor={teamInfo.primaryColor}
              FooterElement={props.FooterElement}
            />
          </div>
        ) : (
          <div>Error: No data</div>
        )}
      </DialogContent>
    </Dialog>
  );
}
