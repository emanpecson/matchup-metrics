import { NextRequest, NextResponse } from 'next/server';
import { Player, Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const query = {
      searchInput: req.nextUrl.searchParams.get('searchInput'),
      team: req.nextUrl.searchParams.get('team'),
      position: req.nextUrl.searchParams.get('position'),
    };
    console.log('query:', query);

    const where = {} as Prisma.PlayerWhereInput;

    // stack where conditions
    if (query.searchInput) {
      where.name = { contains: query.searchInput, mode: 'insensitive' };
    }
    if (query.team) {
      where.team = { contains: query.team };
    }
    if (query.position) {
      where.position = { contains: query.position };
    }

    const players = await prisma.player.findMany({
      where,
      orderBy: {
        fantasyPpg: 'desc',
      },
    });
    console.log('got players:', players);
    return NextResponse.json(players, { status: 200 });
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
