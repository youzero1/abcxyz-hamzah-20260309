import { NextRequest, NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Game } from '@/entities/Game';
import { User } from '@/entities/User';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  try {
    const ds = await getDataSource();
    const repo = ds.getRepository(Game);
    const games = await repo.find({
      order: { createdAt: 'DESC' },
      take: 50,
    });
    return NextResponse.json(games);
  } catch (error) {
    console.error('GET /api/games error:', error);
    return NextResponse.json({ error: 'Failed to fetch games' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { playerX, playerO, winner, moves } = body;

    if (!playerX || !playerO) {
      return NextResponse.json({ error: 'playerX and playerO are required' }, { status: 400 });
    }

    const ds = await getDataSource();
    const gameRepo = ds.getRepository(Game);
    const userRepo = ds.getRepository(User);

    // Upsert users
    const ensureUser = async (username: string) => {
      let user = await userRepo.findOne({ where: { username } });
      if (!user) {
        user = userRepo.create({
          id: uuidv4(),
          username,
          avatar: 'default',
          wins: 0,
          losses: 0,
          draws: 0,
        });
        await userRepo.save(user);
      }
      return user;
    };

    const userXEntity = await ensureUser(playerX);
    const userOEntity = await ensureUser(playerO);

    // Update stats
    if (winner === 'X') {
      userXEntity.wins += 1;
      userOEntity.losses += 1;
    } else if (winner === 'O') {
      userOEntity.wins += 1;
      userXEntity.losses += 1;
    } else if (winner === 'draw') {
      userXEntity.draws += 1;
      userOEntity.draws += 1;
    }

    await userRepo.save(userXEntity);
    await userRepo.save(userOEntity);

    // Save game
    const game = gameRepo.create({
      id: uuidv4(),
      playerX,
      playerO,
      winner: winner || null,
      moves: JSON.stringify(moves || []),
      completedAt: new Date(),
    });

    await gameRepo.save(game);
    return NextResponse.json(game, { status: 201 });
  } catch (error) {
    console.error('POST /api/games error:', error);
    return NextResponse.json({ error: 'Failed to save game' }, { status: 500 });
  }
}
