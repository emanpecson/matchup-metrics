'use client';

import RosterOptimizer from '@/components/roster/optimizer/RosterOptimizer';
import { useLoadData } from '@/hooks/useLoadData';
import { RosterIncludePlayers } from '@/types/response/roster/RosterIncludePlayers';
import { useState } from 'react';

export default function Home() {
  const [roster, setRoster] = useState<RosterIncludePlayers | null>(null);
  useLoadData({
    endpoint: `/api/roster?id=6700d45b3789f1336c88798e`,
    onDataLoaded: setRoster,
  });

  return (
    <div className="flex justify-center place-items-center">
      {roster ? <RosterOptimizer roster={roster} date={new Date()} /> : <p>no roster found</p>}
    </div>
  );
}
