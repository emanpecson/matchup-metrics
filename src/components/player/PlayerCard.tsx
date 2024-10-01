import { Player } from '@prisma/client';
import Image from 'next/image';
import { getPlayerPhotoUrl, getTeamLogoUrl } from '@/utils/getPhotoUrl';
import { PlayerIncludeRegularStats } from '@/types/response/player/PlayerIncludeRegularStats';

export default function PlayerCard({ player }: { player: PlayerIncludeRegularStats }) {
  const rs = player.regularStats;

  return (
    <div className="dark:bg-neutral-900 w-[14rem] h-[20rem] p-6 rounded-2xl relative border-neutral-100 border-2 dark:border-neutral-900 shadow-lg">
      <div className="h-[16.9rem] rounded-lg dark:outline-neutral-800 outline-neutral-200 outline p-2">
        {/* player photo */}
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

        {/* stats */}
        <ul className="border rounded-md divide-y mt-3 mx-1.5 dark:text-neutral-300 text-neutral-600">
          <li className="flex justify-between px-2 pt-1">
            <label>PPG</label>
            <p>{rs.ppg}</p>
          </li>
          <li className="flex justify-between px-2 py-1">
            <label>APG</label>
            <p>{rs.apg}</p>
          </li>
          <li className="flex justify-between px-2 pb-1">
            <label>RPG</label>
            <p>{rs.rpg}</p>
          </li>
        </ul>
      </div>

      {/* team logo */}
      <Image
        src={getTeamLogoUrl(player.teamAbbreviation)}
        alt={player.teamAbbreviation}
        height={24}
        width={24}
        className="h-20 w-20 absolute top-1 left-1 object-contain"
      />

      {/* player name banner */}
      <div className="absolute bottom-4 right-0 w-fit h-fit dark:bg-neutral-800 bg-neutral-200 flex place-items-center px-5 py-2 rounded-l-md">
        <p className="dark:text-neutral-300 text-neutral-600 font-semibold">{player.name}</p>
      </div>
    </div>
  );
}
