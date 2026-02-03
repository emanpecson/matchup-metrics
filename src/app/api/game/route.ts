import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const games = await prisma.game.findMany({});
    return NextResponse.json(games, { status: 200 });
  } catch (error) {
    console.error('error:', error);
    return NextResponse.json(null, { status: 500 });
  }
}
