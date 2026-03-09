import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <div className="mb-8">
        <h1 className="text-6xl font-extrabold text-slate-800 mb-4 tracking-tight">
          abc<span className="text-primary-600">xyz</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-md mx-auto">
          The classic Tic Tac Toe game with social features — track your stats, climb the leaderboard, and share your wins!
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-10 opacity-30 select-none" aria-hidden="true">
        {['X', 'O', 'X', '', 'X', 'O', 'O', '', 'O'].map((cell, i) => (
          <div
            key={i}
            className={`w-16 h-16 flex items-center justify-center text-3xl font-extrabold rounded-xl border-2 ${
              cell === 'X'
                ? 'text-primary-600 border-primary-300 bg-primary-50'
                : cell === 'O'
                ? 'text-rose-500 border-rose-300 bg-rose-50'
                : 'border-slate-200 bg-white'
            }`}
          >
            {cell}
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/game"
          className="btn-primary text-lg px-8 py-3 rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          🎮 Play Now
        </Link>
        <Link
          href="/leaderboard"
          className="btn-secondary text-lg px-8 py-3 rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          🏆 Leaderboard
        </Link>
      </div>

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl">
        <div className="card text-center">
          <div className="text-4xl mb-3">🎯</div>
          <h3 className="font-bold text-slate-700 mb-1">Play & Compete</h3>
          <p className="text-slate-500 text-sm">Challenge a friend locally and track every match</p>
        </div>
        <div className="card text-center">
          <div className="text-4xl mb-3">📊</div>
          <h3 className="font-bold text-slate-700 mb-1">Track Stats</h3>
          <p className="text-slate-500 text-sm">View wins, losses, draws and win rates</p>
        </div>
        <div className="card text-center">
          <div className="text-4xl mb-3">🔗</div>
          <h3 className="font-bold text-slate-700 mb-1">Share Results</h3>
          <p className="text-slate-500 text-sm">Copy and share your game results instantly</p>
        </div>
      </div>
    </div>
  );
}
