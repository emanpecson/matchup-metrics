import InlineImage from '@/components/InlineImage';
import { RosterIncludePlayers } from '@/types/response/roster/RosterIncludePlayers';
import { getPlayerPhotoUrl } from '@/utils/getPhotoUrl';
import { Player, Roster } from '@prisma/client';

interface RosterPreviewItemProps {
  roster: RosterIncludePlayers;
}

export default function RosterPreviewItem(props: RosterPreviewItemProps) {
  return (
    <div className="border rounded-lg p-3 space-y-1">
      {props.roster.players.map((player: Player, i: number) => (
        <InlineImage src={getPlayerPhotoUrl(player.nbaId)} alt={player.name + '-photo'} key={i} rounded>
          <p className="pointer-events-none">{player.name}</p>
        </InlineImage>
      ))}
    </div>
  );
}
