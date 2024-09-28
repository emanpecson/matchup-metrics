import { RosterBuilder } from '@/types/RosterBuilder';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const rosterBuilder: RosterBuilder = await req.json();
    const playerIds: string[] = [];
    for (const slot of rosterBuilder.getRoster()) {
      if (slot.player) playerIds.push(slot.player.id);
    }

    const roster = await prisma.roster.create({ data: { playerIds } });
    return NextResponse.json(roster, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(null, { status: 500 });
  }
}
