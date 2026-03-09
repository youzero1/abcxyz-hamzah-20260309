import Leaderboard from '@/components/Leaderboard';

export const dynamic = 'force-dynamic';

export default function LeaderboardPage() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-2">
          🏆 Leaderboard
        </h1>
        <p className="text-slate-500">Top players ranked by wins and win rate</p>
      </div>
      <Leaderboard />
    </div>
  );
}
