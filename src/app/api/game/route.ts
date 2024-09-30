import prisma from '@/lib/prisma';
import { Game, PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const games = await prisma.game.findMany({});
    return NextResponse.json(games, { status: 200 });
  } catch (error) {
    console.error('error:', error);
    return NextResponse.json(null, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const games: Game[] = await req.json();
    console.log('data count:', games.length);
    const createdGames = await prisma.game.createMany({
      data: games,
    });

    console.log('Success:', createdGames);
    return NextResponse.json(createdGames, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(null, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const res = await prisma.game.deleteMany({});

    console.log('Success:', res);
    return NextResponse.json(null, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json('Server Error', { status: 500 });
  }
}
