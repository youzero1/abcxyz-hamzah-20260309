import { NextRequest, NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { User } from '@/entities/User';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  try {
    const ds = await getDataSource();
    const repo = ds.getRepository(User);
    const users = await repo.find({
      order: { wins: 'DESC' },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error('GET /api/users error:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, avatar } = body;

    if (!username || typeof username !== 'string' || username.trim().length === 0) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    const ds = await getDataSource();
    const repo = ds.getRepository(User);

    const existing = await repo.findOne({ where: { username: username.trim() } });
    if (existing) {
      return NextResponse.json(existing);
    }

    const user = repo.create({
      id: uuidv4(),
      username: username.trim(),
      avatar: avatar || 'default',
      wins: 0,
      losses: 0,
      draws: 0,
    });

    await repo.save(user);
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error('POST /api/users error:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
