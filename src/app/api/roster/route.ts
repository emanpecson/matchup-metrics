import { RosterIncludePlayers } from '@/types/response/roster/RosterIncludePlayers';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const rosters = await prisma.roster.findMany({ include: { players: true } });
    return NextResponse.json(rosters as RosterIncludePlayers[], { status: 200 });
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
