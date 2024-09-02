import { Player } from '@prisma/client';
import { Card, CardContent, CardHeader } from './ui/card';
import Image from 'next/image';
import getPhotoUrl from '@/utils/getPhotoUrl';

export default function PlayerCard({ player }: { player: Player }) {
  return (
    <Card>
      <CardContent>
        <CardHeader>{player.name}</CardHeader>
        <div className="flex justify-center place-items-center">
          <Image
            src={getPhotoUrl(player.nbaId)}
            alt={player.name}
            height={24}
            width={24}
            className="h-32 w-32 object-cover border rounded-full"
            unoptimized
          />
        </div>
      </CardContent>
    </Card>
  );
}
