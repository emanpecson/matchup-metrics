import { PlayerIncludeRegularStats } from '@/types/response/player/PlayerIncludeRegularStats';
import PlayerHeadshot from '../PlayerHeadshot';
import { fullTeamName, reformatHeight, reformatPosition } from '@/utils/reformatString';
import positions from '@/data/positions';
import PlayerStatsCompareTable from './PlayerStatsCompareTable';
import Image from 'next/image';
import { getTeamLogoUrl } from '@/utils/getPhotoUrl';

interface PlayerCompareProps {
  player1: PlayerIncludeRegularStats | null;
  player2: PlayerIncludeRegularStats | null;
}

export default function PlayerCompare(props: PlayerCompareProps) {
  /**
   * Displays player details
   * @param {Object} props - Source for player
   * @returns {JSX.Element}
   */
  const PlayerProfile = (props: { player: PlayerIncludeRegularStats | null }): JSX.Element => {
    return (
      <div className="space-y-2 px-4">
        <div className="flex justify-center">
          <PlayerHeadshot player={props.player} size="lg" />
        </div>
        {props.player ? (
          <div className="text-center space-y-1">
            <p className="font-extrabold text-neutral-800 dark:text-neutral-200 text-nowrap">{props.player.name}</p>
            <p className="inline-flex place-items-center space-x-1.5">
              <Image
                src={getTeamLogoUrl(props.player.teamAbbreviation)}
                height={40}
                width={40}
                alt={props.player.teamAbbreviation}
                unoptimized
              />
              <span className="font-medium text-nowrap">{fullTeamName(props.player.teamAbbreviation)}</span>
            </p>

            <div className="flex space-x-2 justify-center font-medium text-nowrap">
              <span>{reformatPosition(props.player.position as keyof typeof positions)},</span>
              <span>{reformatHeight(props.player.height)},</span>
              <span>{props.player.weight}</span>
            </div>
          </div>
        ) : (
          <div className="text-center font-medium">
            <p>Add player</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex space-x-2 rounded-xl p-4 w-full border mt-8">
      <PlayerProfile player={props.player1} />
      <PlayerStatsCompareTable player1={props.player1} player2={props.player2} />
      <PlayerProfile player={props.player2} />
    </div>
  );
}
