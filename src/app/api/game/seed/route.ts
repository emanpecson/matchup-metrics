import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

interface SeededGameDay {
  day: string;
  date: Date;
  games: SeededGame[];
}

interface SeededGame {
  awayTeamNbaId: string;
  homeTeamNbaId: string;
  time: string;
}

export async function PUT(req: NextRequest) {
  try {
    const seedData: SeededGameDay[] = await req.json();

    // overwrite existing game data
    await prisma.game.deleteMany({});
    await prisma.gameDay.deleteMany({});

    for (const seedGameDay of seedData) {
      const gameDay = await prisma.gameDay.create({
        data: {
          date: new Date(seedGameDay.date),
          day: seedGameDay.day,
        },
      });
      console.log('Created game-day:', gameDay.date);

      for (const seedGame of seedGameDay.games) {
        const game = await prisma.game.create({
          data: {
            time: seedGame.time,
            awayTeamNbaId: seedGame.awayTeamNbaId,
            homeTeamNbaId: seedGame.homeTeamNbaId,
            gameDayId: gameDay.id,
          },
        });

        console.log('Created game:', game.id);
      }
    }

    console.log(`Successfully seeded ${seedData.length} games`);
    return NextResponse.json(null, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(null, { status: 500 });
  }
}
