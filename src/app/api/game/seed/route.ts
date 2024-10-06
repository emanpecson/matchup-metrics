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
  let createdGamesCount = 0;
  let createdGameDaysCount = 0;

  try {
    // get requested data
    const seedData: SeededGameDay[] = await req.json();

    // remove existing game data
    await prisma.game.deleteMany({});
    await prisma.gameDay.deleteMany({});

    for (const seedGameDay of seedData) {
      // create game day
      const gameDay = await prisma.gameDay.create({
        data: {
          date: new Date(seedGameDay.date),
          day: seedGameDay.day,
        },
      });

      createdGameDaysCount++;
      console.log(`[${createdGameDaysCount}/${seedData.length}] Created game-day: ${gameDay.date}`);

      for (const seedGame of seedGameDay.games) {
        // create game w/ linked game day
        const game = await prisma.game.create({
          data: {
            time: seedGame.time,
            awayTeamNbaId: seedGame.awayTeamNbaId,
            homeTeamNbaId: seedGame.homeTeamNbaId,
            gameDayId: gameDay.id,
          },
          include: {
            homeTeam: { select: { abbreviation: true } },
            awayTeam: { select: { abbreviation: true } },
          },
        });

        createdGamesCount++;
        const home = game.homeTeam;
        const away = game.awayTeam;
        console.log(
          `[${createdGamesCount}] Created game: ${home ? home.abbreviation : 'TBD'} @ ${away ? away.abbreviation : 'TBD'}`
        );
      }
    }

    console.log(`Successfully seeded ${createdGamesCount} games on ${createdGameDaysCount} days`);
    return NextResponse.json(createdGamesCount, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(null, { status: 500 });
  }
}
