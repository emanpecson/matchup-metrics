import { Player } from '@prisma/client';
import Image from 'next/image';
import { getPlayerPhotoUrl, getTeamLogoUrl } from '@/utils/getPhotoUrl';
import { teamIds } from '@/data/teamIds';

export default function PlayerCard({ player }: { player: Player }) {
  return (
    <div className="dark:bg-neutral-900 w-[14rem] h-[20rem] p-6 rounded-2xl relative">
      <div className="h-[16.9rem] border rounded-lg dark:outline-neutral-800 outline p-2">
        <div className="flex justify-center">
          <Image
            src={getPlayerPhotoUrl(player.nbaId)}
            alt={player.name}
            height={24}
            width={24}
            className="h-28 w-28 object-cover border rounded-full"
            unoptimized
          />
        </div>
        <ul className="border rounded-md divide-y mt-3 mx-1.5">
          <li className="flex justify-between px-2 pt-1">
            <label>PPG</label>
            <p>{player.ppg}</p>
          </li>
          <li className="flex justify-between px-2 py-1">
            <label>APG</label>
            <p>{player.apg}</p>
          </li>
          <li className="flex justify-between px-2 pb-1">
            <label>RPG</label>
            <p>{player.rpg}</p>
          </li>
        </ul>
      </div>

      {/* <div className="rounded-full h-12 w-12 bg-red-400 absolute top-2 left-2" /> */}
      <Image
        src={getTeamLogoUrl(teamIds[player.team as keyof typeof teamIds])}
        alt={player.team}
        height={24}
        width={24}
        className="h-20 w-20 absolute top-1 left-1 object-contain"
      />

      <div className="absolute bottom-4 right-0 w-fit h-fit dark:bg-neutral-800 flex place-items-center px-5 py-2 rounded-l-md">
        <p className="dark:text-neutral-300 font-medium">{player.name}</p>
      </div>
    </div>
  );
}
