import positions from '@/data/positions';
import { getPlayerPhotoUrl, getTeamLogoUrl } from '@/utils/getPhotoUrl';
import { reformatPosition, shortName } from '@/utils/reformatString';
import { Player } from '@prisma/client';
import Image from 'next/image';
import teams from '@/data/teams';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { BanIcon, MinusIcon, PlusIcon } from 'lucide-react';

interface RosterItemProps {
  player: Player | null;
  position: keyof typeof positions;
  onAdd?: () => void;
  onRemove: () => void;
  invalidPosition?: boolean;
}

export default function RosterItem(props: RosterItemProps) {
  const [isHovering, setIsHovering] = useState(false);

  const p = props.player;
  const teamLogoUrl = p ? getTeamLogoUrl(teams[p.team as keyof typeof teams].nbaId) : '';

  return (
    <div className="space-y-1 w-fit">
      <button
        className="relative"
        disabled={props.invalidPosition && !props.onAdd}
        onMouseOver={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => {
          if (!!props.onAdd) props.onAdd();
          else if (props.player) props.onRemove();
        }}
      >
        <div className="rounded-2xl bg-neutral-200 dark:bg-neutral-800 h-28 w-32">
          <Image
            src={getPlayerPhotoUrl(p?.nbaId ?? '')}
            alt={p?.name ?? ''}
            height={24}
            width={24}
            className={cn(!teamLogoUrl && 'opacity-30', 'h-36 w-32 object-cover absolute bottom-0 rounded-b-2xl')}
            unoptimized
          />
        </div>

        {p && (
          <div className="absolute rounded-full bg-neutral-300 dark:bg-neutral-700 -bottom-3 -left-3 bg-opacity-70 backdrop-blur-lg">
            <Image
              src={teamLogoUrl}
              alt={p.team}
              height={24}
              width={24}
              className="h-10 w-10 object-cover flex justify-center place-items-center"
              unoptimized
            />
          </div>
        )}

        {(props.player || props.onAdd) && !props.invalidPosition && (
          <div
            className={cn(
              isHovering ? 'opacity-100' : 'opacity-0',
              'rounded-full bg-neutral-100 dark:bg-neutral-900 p-3 absolute top-8 left-10 duration-150 transition-opacity shadow-lg'
            )}
          >
            {props.onAdd ? <PlusIcon className="text-neutral-500" /> : <MinusIcon className="text-neutral-500" />}
          </div>
        )}

        {props.invalidPosition && (
          <div className="absolute top-5 left-7 p-1 bg-red-400 opacity-70 rounded-full">
            <BanIcon size={64} className="text-red-800" />
          </div>
        )}
      </button>

      <div className="flex flex-col place-items-center text-center">
        <p className="font-medium text-sm text-neutral-500 dark:text-neutral-400">{reformatPosition(props.position)}</p>
        <div>
          {p ? (
            <div>
              <p className="font-semibold text-sm">{shortName(p.name)}</p>
            </div>
          ) : (
            <p className="text-neutral-500 dark:text-neutral-400 font-medium text-sm">
              {props.invalidPosition ? 'Invalid position' : 'Add player'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
