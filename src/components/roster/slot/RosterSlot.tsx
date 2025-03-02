import positions from '@/data/positions';
import { getTeamLogoUrl } from '@/utils/getPhotoUrl';
import { reformatPosition, shortName } from '@/utils/reformatString';
import Image from 'next/image';
import { useState } from 'react';
import ActionPrompt from './ActionPrompt';
import { PlayerIncludeRegularStats } from '@/types/response/player/PlayerIncludeRegularStats';
import PlayerHeadshot from '@/components/player/PlayerHeadshot';

interface RosterSlotProps {
  player: PlayerIncludeRegularStats | null;
  position: keyof typeof positions;
  state: RosterSlotState;
  onClick?: () => void;
  showStats?: boolean;
}

export enum RosterSlotState {
  STATIC,
  ADD,
  REMOVE,
  SWAP,
  DISABLE,
}

export default function RosterSlot(props: RosterSlotProps) {
  const [isHovering, setIsHovering] = useState(false);

  const p = props.player;
  const teamLogoUrl = p ? getTeamLogoUrl(p.teamAbbreviation) : '';

  return (
    <div className="space-y-1 w-fit">
      <button
        className="relative"
        disabled={props.state === RosterSlotState.DISABLE || props.state === RosterSlotState.STATIC}
        onMouseOver={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => {
          if (!!props.onClick) props.onClick();
        }}
      >
        <PlayerHeadshot player={p} />

        {/* team logo */}
        {p && (
          <div className="absolute rounded-full bg-neutral-300 dark:bg-neutral-700 -bottom-3 -left-3 bg-opacity-70 backdrop-blur-lg">
            <Image
              src={teamLogoUrl}
              alt={p.teamAbbreviation}
              height={24}
              width={24}
              className="h-10 w-10 object-cover flex justify-center place-items-center"
              unoptimized
            />
          </div>
        )}

        <ActionPrompt state={props.state} isHovering={isHovering} />
      </button>

      {/* bottom text */}
      <div className="flex flex-col place-items-center text-center">
        <p className="font-medium text-sm text-neutral-500 dark:text-neutral-400">{reformatPosition(props.position)}</p>
        <div>
          {p ? (
            <div>
              <p className="font-semibold text-sm">{shortName(p.name)}</p>
            </div>
          ) : (
            <p className="text-neutral-500 dark:text-neutral-400 font-medium text-sm">
              {props.state === RosterSlotState.DISABLE ? 'Invalid position' : 'Add player'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
