import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

interface SeededPlayerStats {
  type: string;
  gp: number;
  ppg: number;
  apg: number;
  rpg: number;
  spg: number;
  bpg: number;
  tpg: number;
  mpg: number;
  fgPct: number;
  fg3Pct: number;
  ftPct: number;
  plusMinus: number;
}

interface SeededPlayer {
  nbaId: string;
  name: string;
  age: number;
  height: string;
  weight: string;
  position: string;
  country: string;
  lastAttended: string;
  jersey: string;
  teamAbbreviation: string;
  regularStats: SeededPlayerStats;
}

export async function PUT(req: NextRequest) {
  let createdPlayerCount = 0;
  let updatedPlayerCount = 0;

  try {
    const seedData: SeededPlayer[] = await req.json();

    for (const x of seedData) {
      const findPlayer = await prisma.player.findUnique({ where: { nbaId: x.nbaId } });
      if (findPlayer) {
        const updatedPlayer = await prisma.player.update({
          where: { id: findPlayer.id },
          data: {
            name: x.name,
            age: x.age,
            country: x.country,
            height: x.height,
            weight: x.weight,
            jersey: x.jersey,
            lastAttended: x.lastAttended,
            position: x.position,
            teamAbbreviation: x.teamAbbreviation,
            regularStats: {
              update: {
                ppg: x.regularStats.ppg,
                apg: x.regularStats.apg,
                rpg: x.regularStats.rpg,
                gp: x.regularStats.gp,
                bpg: x.regularStats.bpg,
                spg: x.regularStats.spg,
                fgPct: x.regularStats.fgPct,
                fg3Pct: x.regularStats.fg3Pct,
                ftPct: x.regularStats.ftPct,
                mpg: x.regularStats.mpg,
                tpg: x.regularStats.tpg,
                plusMinus: x.regularStats.plusMinus,
              },
            },
          },
        });

        updatedPlayerCount++;
        console.log(
          `[${updatedPlayerCount + createdPlayerCount}/${seedData.length}] Updated player: ${updatedPlayer.name}`
        );
      } else {
        const createdPlayer = await prisma.player.create({
          data: {
            nbaId: x.nbaId,
            name: x.name,
            age: x.age,
            country: x.country,
            height: x.height,
            weight: x.weight,
            jersey: x.jersey,
            lastAttended: x.lastAttended,
            position: x.position,
            teamAbbreviation: x.teamAbbreviation,
            regularStats: {
              create: {
                ppg: x.regularStats.ppg,
                apg: x.regularStats.apg,
                rpg: x.regularStats.rpg,
                gp: x.regularStats.gp,
                bpg: x.regularStats.bpg,
                spg: x.regularStats.spg,
                fgPct: x.regularStats.fgPct,
                fg3Pct: x.regularStats.fg3Pct,
                ftPct: x.regularStats.ftPct,
                mpg: x.regularStats.mpg,
                tpg: x.regularStats.tpg,
                plusMinus: x.regularStats.plusMinus,
                type: 'REGULAR',
              },
            },
          },
        });

        createdPlayerCount++;
        console.log(
          `[${createdPlayerCount + updatedPlayerCount}/${seedData.length}] Created player: ${createdPlayer.name}`
        );
      }
    }

    console.log(`Successfully seeded ${createdPlayerCount + updatedPlayerCount}/${seedData.length} players`);
    return NextResponse.json(createdPlayerCount + updatedPlayerCount, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(null, { status: 500 });
  }
}
