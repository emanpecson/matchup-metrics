import { Player } from '@prisma/client';
import { Card, CardContent } from './ui/card';

export default function PlayerCard({ player }: { player: Player }) {
  return (
    <Card>
      <CardContent>
        <p>player</p>
      </CardContent>
    </Card>
  );
}
