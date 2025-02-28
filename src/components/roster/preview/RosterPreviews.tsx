import { useLoadData } from '@/hooks/useLoadData';
import { Roster } from '@prisma/client';
import { useState } from 'react';
import RosterPreviewItem from './RosterPreviewItem';
import { RosterIncludePlayers } from '@/types/response/roster/RosterIncludePlayers';

export default function RosterPreviews() {
  const [rosters, setRosters] = useState<RosterIncludePlayers[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useLoadData({ endpoint: '/api/roster', onDataLoaded: setRosters, setIsLoading, delay: 150 });

  // TODO: add loading + no-data state

  return (
    <div>
      {isLoading ? (
        <div>loading</div>
      ) : rosters.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {rosters.map((roster: RosterIncludePlayers, i: number) => (
            <RosterPreviewItem roster={roster} key={i} />
          ))}
        </div>
      ) : (
        <p>No rosters</p>
      )}
    </div>
  );
}
