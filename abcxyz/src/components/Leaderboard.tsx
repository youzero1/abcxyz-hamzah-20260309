'use client';

import { useState, useEffect } from 'react';

interface LeaderboardEntry {
  id: string;
  username: string;
  avatar: string;
  wins: number;
  losses: number;
  draws: number;
  totalGames: number;
  winRate: number;
}

const AVATARS: Record<string, string> = {
  default: '🧑',
  cool: '😎',
  ninja: '🥷',
  robot: '🤖',
  alien: '👽',
  fire: '🔥',
};

const RANK_ICONS: Record<number, string> = {
  1: '🥇',
  2: '🥈',
  3: '🥉',
};

export default function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch('/api/leaderboard');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setEntries(data);
      } catch {
        setError('Failed to load leaderboard. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-slate-500 text-lg animate-pulse">Loading leaderboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="card text-center py-12 w-full max-w-2xl">
        <div className="text-5xl mb-4">🎮</div>
        <p className="text-slate-500 text-lg">No games played yet.</p>
        <p className="text-slate-400 text-sm mt-2">Play a game to appear on the leaderboard!</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl">
      {/* Top 3 podium */}
      {entries.length >= 1 && (
        <div className="flex justify-center gap-4 mb-8">
          {entries.slice(0, 3).map((entry, idx) => (
            <div
              key={entry.id}
              className={`card flex flex-col items-center flex-1 ${
                idx === 0 ? 'border-2 border-yellow-400 bg-yellow-50' :
                idx === 1 ? 'border-2 border-slate-300 bg-slate-50' :
                'border-2 border-amber-700/30 bg-amber-50'
              }`}
            >
              <div className="text-3xl">{RANK_ICONS[idx + 1] || `#${idx + 1}`}</div>
              <div className="text-2xl mt-1">{AVATARS[entry.avatar] || '🧑'}</div>
              <div className="font-bold text-slate-700 text-center text-sm mt-1 truncate max-w-full" title={entry.username}>
                {entry.username}
              </div>
              <div className="text-2xl font-extrabold text-primary-600 mt-1">{entry.wins}</div>
              <div className="text-xs text-slate-500">wins</div>
              <div className="text-sm font-semibold text-slate-600 mt-1">{entry.winRate}%</div>
              <div className="text-xs text-slate-400">win rate</div>
            </div>
          ))}
        </div>
      )}

      {/* Full table */}
      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="py-3 px-4 text-left text-slate-500 font-semibold">Rank</th>
                <th className="py-3 px-4 text-left text-slate-500 font-semibold">Player</th>
                <th className="py-3 px-4 text-center text-slate-500 font-semibold">W</th>
                <th className="py-3 px-4 text-center text-slate-500 font-semibold">L</th>
                <th className="py-3 px-4 text-center text-slate-500 font-semibold">D</th>
                <th className="py-3 px-4 text-center text-slate-500 font-semibold">Games</th>
                <th className="py-3 px-4 text-center text-slate-500 font-semibold">Win%</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, idx) => (
                <tr
                  key={entry.id}
                  className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${
                    idx === 0 ? 'bg-yellow-50/50' : ''
                  }`}
                >
                  <td className="py-3 px-4 font-bold text-slate-600">
                    {RANK_ICONS[idx + 1] || `#${idx + 1}`}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{AVATARS[entry.avatar] || '🧑'}</span>
                      <span className="font-semibold text-slate-700">{entry.username}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center font-semibold text-primary-600">{entry.wins}</td>
                  <td className="py-3 px-4 text-center font-semibold text-rose-500">{entry.losses}</td>
                  <td className="py-3 px-4 text-center font-semibold text-amber-600">{entry.draws}</td>
                  <td className="py-3 px-4 text-center text-slate-600">{entry.totalGames}</td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${
                        entry.winRate >= 60
                          ? 'bg-green-100 text-green-700'
                          : entry.winRate >= 40
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {entry.winRate}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
