import { cn } from '@/lib/utils';
import { PlayerIncludeRegularStats } from '@/types/response/player/PlayerIncludeRegularStats';
import { getPlayerPhotoUrl, getTeamLogoUrl } from '@/utils/getPhotoUrl';
import Image from 'next/image';

export interface PlayerHeadshotProps {
  player: PlayerIncludeRegularStats | null;
  size?: 'sm' | 'md' | 'lg';
}

export default function PlayerHeadshot(props: PlayerHeadshotProps) {
  const teamLogoUrl = props.player ? getTeamLogoUrl(props.player.teamAbbreviation) : '';

  const bgSizeStyle = props.size === 'md' ? 'h-28 w-32' : props.size === 'lg' ? 'h-48 w-52' : 'h-20 w-24';
  const imageSizeStyle = props.size === 'md' ? 'h-36 w-32' : props.size === 'lg' ? 'h-60 w-52' : 'h-24 w-28';

  return (
    <div className={cn(bgSizeStyle, 'rounded-2xl bg-neutral-200 dark:bg-neutral-800 relative')}>
      <Image
        src={getPlayerPhotoUrl(props.player?.nbaId ?? '')}
        alt={props.player?.name ?? ''}
        height={24}
        width={24}
        className={cn(!teamLogoUrl && 'opacity-30', imageSizeStyle, 'object-cover absolute bottom-0 rounded-b-2xl')}
        unoptimized
      />
    </div>
  );
}
