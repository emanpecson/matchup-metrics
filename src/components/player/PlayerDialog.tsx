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
  const teamInfo = teams[props.player?.team as keyof typeof teams];
  const primaryColor = props.player ? teamInfo.colors[0] : '';
  const secondaryColor = props.player ? teamInfo.colors[1] : '';
  const tertiaryColor = props.player && teamInfo.colors.length >= 3 ? teamInfo.colors[2] : '';
  const headerHeight = '10rem';

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
              className="absolute top-0 left-0 rounded-t-lg w-full overflow-clip"
              style={{ backgroundColor: primaryColor, height: headerHeight }}
            >
              <div className="relative h-full w-full">
                {/* <div
                  style={{ backgroundColor: tertiaryColor ?? primaryColor }}
                  className="rounded-full h-[12rem] w-[12rem] absolute -bottom-24 left-6 overflow-hidden"
                />
                <div
                  style={{ backgroundColor: secondaryColor }}
                  className="rounded-full h-[16rem] w-[16rem] absolute -bottom-32 -left-20 overflow-hidden"
                /> */}
                <Image
                  src={getPlayerPhotoUrl(props.player.nbaId)}
                  alt={props.player?.name}
                  height={24}
                  width={24}
                  unoptimized
                  className="w-fit h-36 object-cover pl-2 absolute bottom-0"
                />

                <div className="absolute top-2 right-5">
                  <div className="flex place-items-center space-x-2">
                    <div className="text-white">
                      <h3 className="tracking-wider font-medium text-2xl text-right">{teamInfo.city}</h3>
                      <h3 className="tracking-wider font-medium text-2xl text-right">{teamInfo.name}</h3>
                    </div>
                    <Image
                      src={getTeamLogoUrl(teamInfo.nbaId, true)}
                      alt={`${teamInfo.abbreviation}-logo`}
                      height={24}
                      width={24}
                      className="h-24 w-24 object-cover"
                      unoptimized
                    />
                  </div>
                </div>

                <div className="text-3xl font-bold flex space-x-3 tracking-wider absolute bottom-2 right-5 text-white">
                  <h2>{props.player.jersey}</h2>
                  <h2>{'•'}</h2>
                  <h2>{props.player.name}</h2>
                </div>
              </div>
            </div>
            <div style={{ paddingTop: headerHeight }}></div>
          </div>
        ) : (
          <div>Error: No data</div>
        )}
      </DialogContent>
    </Dialog>
  );
}
