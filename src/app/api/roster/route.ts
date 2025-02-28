import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const includePlayers: Prisma.RosterInclude = { players: { include: { regularStats: true } } };

export async function GET(req: NextRequest) {
  try {
    const query = { id: req.nextUrl.searchParams.get('id') };
    console.log('query:', query);

    if (query.id) {
      const roster = await prisma.roster.findUnique({ where: { id: query.id }, include: includePlayers });
      return NextResponse.json(roster, { status: 200 });
    } else {
      const rosters = await prisma.roster.findMany({ include: includePlayers });
      return NextResponse.json(rosters, { status: 200 });
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(null, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const playerIds: string[] = await req.json();
    const roster = await prisma.roster.create({ data: { playerIds } });
    return NextResponse.json(roster, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(null, { status: 500 });
  }
}
