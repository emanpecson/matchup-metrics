import { Player } from '@prisma/client';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '../ui/dialog';
import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import { getPlayerPhotoUrl, getTeamLogoUrl } from '@/utils/getPhotoUrl';
import { cn } from '@/lib/utils';
import teams from '@/data/teams';

interface PlayerDialogProps {
  player: Player | null;
  setPlayer: Dispatch<SetStateAction<Player | null>>;
}

export default function PlayerDialog(props: PlayerDialogProps) {
  const primaryColor = props.player ? teams[props.player.team as keyof typeof teams].colors[0] : '';
  const secondaryColor = props.player ? teams[props.player.team as keyof typeof teams].colors[1] : '';
  const twHeaderHeight = '10rem';
  const teamInfo = teams[props.player?.team as keyof typeof teams];

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
            <div
              className="absolute top-0 left-0 rounded-t-lg w-full"
              style={{ backgroundColor: primaryColor, height: twHeaderHeight }}
            >
              <div className="relative h-full w-full">
                <Image
                  src={getPlayerPhotoUrl(props.player.nbaId)}
                  alt={props.player?.name}
                  height={24}
                  width={24}
                  unoptimized
                  className="w-fit h-28 object-cover pl-2 absolute bottom-0"
                />

                <div className="absolute top-2 right-5">
                  <div className="flex place-items-center space-x-2">
                    <div style={{ color: 'white', textShadow: `2.5x 2.5px 2px ${secondaryColor}` }}>
                      <h3 className="tracking-wider font-bold text-2xl text-right">{teamInfo.city}</h3>
                      <h3 className="tracking-wider font-bold text-2xl text-right">{teamInfo.name}</h3>
                    </div>
                    <Image
                      src={getTeamLogoUrl(teamInfo.nbaId)}
                      alt={`${teamInfo.abbreviation}-logo`}
                      height={24}
                      width={24}
                      className="h-24 w-24 object-cover"
                      unoptimized
                    />
                  </div>
                </div>

                <div
                  className="text-3xl font-bold flex space-x-3 tracking-wider absolute bottom-2 right-5"
                  style={{ color: 'white', textShadow: `2.5x 2.5px 2px ${secondaryColor}` }}
                >
                  <h2>{props.player.jersey}</h2>
                  <h2>{'•'}</h2>
                  <h2>{props.player.name}</h2>
                </div>
              </div>
            </div>
            <div style={{ paddingTop: twHeaderHeight }}>test</div>
          </div>
        ) : (
          <div>No data</div>
        )}
      </DialogContent>
    </Dialog>
  );
}
