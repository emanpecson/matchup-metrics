export const dynamic = 'force-dynamic';

import prisma from '@/lib/prisma';
import { Team } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const query = {
      nbaId: req.nextUrl.searchParams.get('nbaId'),
      abbreviation: req.nextUrl.searchParams.get('abbreviation'),
    };

    if (query.nbaId) {
      const team = await prisma.team.findUnique({ where: { nbaId: query.nbaId } });
      return NextResponse.json(team, { status: 200 });
    } else if (query.abbreviation) {
      const team = await prisma.team.findUnique({ where: { abbreviation: query.abbreviation } });
      return NextResponse.json(team, { status: 200 });
    }
    const teams = await prisma.team.findMany({});
    return NextResponse.json(teams, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(null, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const teams: Team[] = await req.json();
    console.log('data count:', teams.length);
    const createdTeams = await prisma.team.createMany({
      data: teams,
    });

    console.log('Success:', createdTeams);
    return NextResponse.json(createdTeams, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(null, { status: 500 });
  }
}
