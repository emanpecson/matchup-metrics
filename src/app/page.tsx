'use client';

import { useLoadData } from '@/hooks/useLoadData';
import { Card } from '@prisma/client';
import { useState } from 'react';

export default function Home() {
  const [cards, setCards] = useState<Card[]>([]);
  useLoadData({ apiEndpoint: '/api/card', onDataLoaded: setCards });

  return (
    <div className="h-screen w-screen flex justify-center place-items-center">
      <div className="text-center">{JSON.stringify(cards)}</div>
    </div>
  );
}
