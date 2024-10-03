import { getPlayerPhotoUrl, getTeamLogoUrl } from '@/utils/getPhotoUrl';
import { Player } from '@prisma/client';
import Image from 'next/image';
import { reformatPosition } from '@/utils/reformatString';
import positions from '@/data/positions';
import { PlayerIncludeRegularStats } from '@/types/response/player/PlayerIncludeRegularStats';
import { yahooFantasyPpg } from '@/utils/fantasyConverter';

export default function PlayerStaged({ player }: { player: PlayerIncludeRegularStats }) {
  const rs = player.regularStats;

  return (
    <div className="border rounded-2xl p-3.5 shadow-md dark:shadow-neutral-800 dark:border-neutral-700 w-fit bg-white dark:bg-neutral-900">
      <div className="flex space-x-1 place-items-center">
        <div className="relative border h-32 w-32 rounded-2xl">
          <Image
            src={getPlayerPhotoUrl(player.nbaId)}
            alt={player.name}
            height={24}
            width={24}
            className="rounded-xl object-cover h-36 w-32 absolute bottom-0"
            unoptimized
          />

          <div className="absolute rounded-full bg-neutral-300 dark:bg-neutral-700 -bottom-6 -left-6 bg-opacity-70 backdrop-blur-lg">
            <Image
              src={getTeamLogoUrl(player.teamAbbreviation)}
              alt={player.teamAbbreviation}
              height={24}
              width={24}
              className="h-10 w-10 object-cover flex justify-center place-items-center"
              unoptimized
            />
          </div>
        </div>

        <div className="space-y-1 divide-y px-2">
          <div className="-space-y-1.5">
            <p className="text-base font-semibold">{player.name}</p>
            <p className="text-sm font-medium dark:text-neutral-400 text-neutral-600">
              {reformatPosition(player.position as keyof typeof positions)}
            </p>
          </div>

          <div className="flex space-x-4 pt-1.5">
            <table>
              <tbody>
                <tr>
                  <td className="text-left uppercase text-xs text-neutral-500 font-bold">FTSY</td>
                  <td className="text-right text-sm pl-2 pr-0.5">{yahooFantasyPpg(rs)}</td>
                </tr>

                <tr>
                  <td className="text-left uppercase text-xs text-neutral-500 font-bold">PPG</td>
                  <td className="text-right text-sm pl-2 pr-0.5">{rs.ppg.toFixed(1)}</td>
                </tr>

                <tr>
                  <td className="text-left uppercase text-xs text-neutral-500 font-bold">APG</td>
                  <td className="text-right text-sm pl-2 pr-0.5">{rs.apg.toFixed(1)}</td>
                </tr>

                <tr>
                  <td className="text-left uppercase text-xs text-neutral-500 font-semibold">RPG</td>
                  <td className="text-right text-sm pl-2 pr-0.5">{rs.rpg.toFixed(1)}</td>
                </tr>
              </tbody>
            </table>

            <table>
              <tbody>
                <tr>
                  <td className="text-left uppercase text-xs text-neutral-500 font-semibold">BPG</td>
                  <td className="text-right text-sm pl-2 pr-0.5">{rs.bpg.toFixed(1)}</td>
                </tr>

                <tr>
                  <td className="text-left uppercase text-xs text-neutral-500 font-semibold">SPG</td>
                  <td className="text-right text-sm pl-2 pr-0.5">{rs.spg.toFixed(1)}</td>
                </tr>

                <tr>
                  <td className="text-left uppercase text-xs text-neutral-500 font-semibold">TPG</td>
                  <td className="text-right text-sm pl-2 pr-0.5">{rs.tpg.toFixed(1)}</td>
                </tr>

                <tr>
                  <td className="text-left uppercase text-xs text-neutral-500 font-semibold">MPG</td>
                  <td className="text-right text-sm pl-2 pr-0.5">{rs.mpg.toFixed(1)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
