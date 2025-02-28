import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const query = {
    teamAbbreviation: req.nextUrl.searchParams.get('teamAbbreviation'),
    date: req.nextUrl.searchParams.get('date'), // expecting ISO string
  };
  console.log(query);

  try {
    // conditionally add params
    const where: Prisma.GameWhereInput = {};
    if (query.teamAbbreviation)
      where.OR = [
        { awayTeam: { abbreviation: query.teamAbbreviation } },
        { homeTeam: { abbreviation: query.teamAbbreviation } },
      ];
    if (query.date) where.gameDay = { date: query.date };

    const games = await prisma.game.findMany({ where, include: { gameDay: true } });
    return NextResponse.json(games, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(null, { status: 500 });
  }
}
