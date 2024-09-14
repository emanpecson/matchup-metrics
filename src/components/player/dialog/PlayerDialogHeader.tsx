import { TeamInfo } from '@/data/teams';
import { getPlayerPhotoUrl, getTeamLogoUrl } from '@/utils/getPhotoUrl';
import { Player } from '@prisma/client';
import Image from 'next/image';

export interface PlayerDialogHeaderProps {
  player: Player;
  teamInfo: TeamInfo;
  primaryColor: string;
  headerHeight: string;
}

export default function PlayerDialogHeader(props: PlayerDialogHeaderProps) {
  return (
    <div
      className="absolute top-0 left-0 rounded-t-2xl w-full overflow-clip"
      style={{ backgroundColor: props.primaryColor, height: props.headerHeight }}
    >
      <div className="relative h-full w-full">
        {/* <div
					style={{ backgroundColor: secondaryColor }}
					className="rounded-full h-[16rem] w-[16rem] absolute -bottom-32 -left-20 overflow-hidden"
				/> */}
        <Image
          src={getPlayerPhotoUrl(props.player.nbaId)}
          alt={props.player.name}
          height={24}
          width={24}
          unoptimized
          className="w-fit h-36 object-cover pl-2 absolute bottom-0"
        />

        <div className="absolute top-2 right-5">
          <div className="flex place-items-center space-x-2 relative">
            <div className="text-white">
              <h3 className="tracking-wider font-medium text-2xl text-right">{props.teamInfo.city}</h3>
              <h3 className="tracking-wider font-medium text-2xl text-right">{props.teamInfo.name}</h3>
            </div>

            <Image
              src={getTeamLogoUrl(props.teamInfo.abbreviation, true)}
              alt={`${props.teamInfo.abbreviation}-logo`}
              height={24}
              width={24}
              className="h-24 w-24 object-cover z-10"
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
  );
}
