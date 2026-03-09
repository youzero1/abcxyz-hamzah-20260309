import { NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { User } from '@/entities/User';

export async function GET() {
  try {
    const ds = await getDataSource();
    const repo = ds.getRepository(User);
    const users = await repo.find({
      order: { wins: 'DESC' },
    });

    const leaderboard = users.map((user) => {
      const totalGames = user.wins + user.losses + user.draws;
      const winRate = totalGames > 0 ? Math.round((user.wins / totalGames) * 100) : 0;
      return {
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        wins: user.wins,
        losses: user.losses,
        draws: user.draws,
        totalGames,
        winRate,
      };
    });

    return NextResponse.json(leaderboard);
  } catch (error) {
    console.error('GET /api/leaderboard error:', error);
    return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 });
  }
}
