import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import prisma from '@/lib/prisma';

const includeRegularStats: Prisma.PlayerInclude = { regularStats: true };

export async function GET(req: NextRequest) {
  try {
    const query = {
      name: req.nextUrl.searchParams.get('name'),
      team: req.nextUrl.searchParams.get('team'),
      position: req.nextUrl.searchParams.get('position'),
      skip: req.nextUrl.searchParams.get('skip'),
      take: req.nextUrl.searchParams.get('take'),
    };
    console.log('query:', query);
    const where = {} as Prisma.PlayerWhereInput;

    // stack where conditions
    if (query.name) where.name = { contains: query.name, mode: 'insensitive' };
    if (query.team) where.team = { abbreviation: { contains: query.team } };
    if (query.position) where.position = { contains: query.position };

    const players = await prisma.player.findMany({
      where,
      orderBy: { regularStats: { ppg: 'desc' } },
      skip: Number(query.skip),
      take: Number(query.take),
      include: includeRegularStats,
    });

    const playersCount = await prisma.player.count({ where });

    return NextResponse.json({ players, playersCount }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(null, { status: 500 });
  }
}
