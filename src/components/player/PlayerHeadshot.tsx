import { cn } from '@/lib/utils';
import { PlayerIncludeRegularStats } from '@/types/response/player/PlayerIncludeRegularStats';
import { getPlayerPhotoUrl } from '@/utils/getPhotoUrl';
import Image from 'next/image';

interface PlayerHeadshotProps {
  player: PlayerIncludeRegularStats | null;
  teamLogoUrl: string;
}

export default function PlayerHeadshot(props: PlayerHeadshotProps) {
  return (
    <div className="rounded-2xl bg-neutral-200 dark:bg-neutral-800 h-28 w-32">
      <Image
        src={getPlayerPhotoUrl(props.player?.nbaId ?? '')}
        alt={props.player?.name ?? ''}
        height={24}
        width={24}
        className={cn(!props.teamLogoUrl && 'opacity-30', 'h-36 w-32 object-cover absolute bottom-0 rounded-b-2xl')}
        unoptimized
      />
    </div>
  );
}
