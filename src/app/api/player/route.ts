import { NextRequest, NextResponse } from 'next/server';
import { Player, Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
    if (query.team) where.team = { contains: query.team };
    if (query.position) where.position = { contains: query.position };

    const players = await prisma.player.findMany({
      where,
      orderBy: { fantasyPpg: 'desc' },
      skip: Number(query.skip),
      take: Number(query.take),
    });

    const playersCount = await prisma.player.count({ where });

    return NextResponse.json({ players, playersCount }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(null, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const players: Player[] = await req.json();
    console.log('data count:', players.length);
    const createdPlayers = await prisma.player.createMany({
      data: players,
    });

    console.log('Success:', createdPlayers);
    return NextResponse.json(createdPlayers, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(null, { status: 500 });
  }
}

// may need some typa security arg to prevent delete access from public
export async function DELETE() {
  try {
    const res = await prisma.player.deleteMany({});

    console.log('Success:', res);
    return NextResponse.json(null, { status: 200 }); // correct status code? 204?
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json('Server Error', { status: 500 });
  }
}
