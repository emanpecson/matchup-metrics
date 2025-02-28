import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const includeGames: Prisma.GameDayInclude = { games: { include: { awayTeam: true, homeTeam: true } } };

export async function GET(req: NextRequest) {
  const query = {
    date: req.nextUrl.searchParams.get('date'), // expecting ISO string
  };
  console.log(query);

  try {
    if (query.date) {
      const gameDay = await prisma.gameDay.findUnique({ where: { date: query.date }, include: includeGames });
      return NextResponse.json(gameDay, { status: 200 });
    } else {
      const gameDays = await prisma.gameDay.findMany({ include: includeGames });
      return NextResponse.json(gameDays, { status: 200 });
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(null, { status: 500 });
  }
}
