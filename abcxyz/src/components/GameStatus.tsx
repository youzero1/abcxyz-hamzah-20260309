'use client';

import { GameResult, Player } from '@/utils/gameLogic';

interface GameStatusProps {
  result: GameResult;
  currentPlayer: Player;
  playerX: string;
  playerO: string;
  gameOver: boolean;
  isSaving: boolean;
  gameSaved: boolean;
  saveError: string;
}

export default function GameStatus({
  result,
  currentPlayer,
  playerX,
  playerO,
  gameOver,
  isSaving,
  gameSaved,
  saveError,
}: GameStatusProps) {
  let statusText = '';
  let statusColor = '';

  if (result.winner) {
    const winnerName = result.winner === 'X' ? playerX : playerO;
    statusText = `🎉 ${winnerName} (${result.winner}) wins!`;
    statusColor =
      result.winner === 'X'
        ? 'bg-primary-100 text-primary-700 border-primary-300'
        : 'bg-rose-100 text-rose-700 border-rose-300';
  } else if (result.isDraw) {
    statusText = "🤝 It's a Draw!";
    statusColor = 'bg-amber-100 text-amber-700 border-amber-300';
  } else {
    const playerName = currentPlayer === 'X' ? playerX : playerO;
    statusText = `${currentPlayer === 'X' ? '🔵' : '🔴'} ${playerName}'s turn (${currentPlayer})`;
    statusColor =
      currentPlayer === 'X'
        ? 'bg-primary-50 text-primary-700 border-primary-200'
        : 'bg-rose-50 text-rose-700 border-rose-200';
  }

  return (
    <div className="flex flex-col items-center gap-2 w-full max-w-sm">
      <div className={`w-full text-center py-3 px-4 rounded-xl border-2 font-semibold text-lg ${statusColor}`}>
        {statusText}
      </div>
      {gameOver && (
        <div className="text-sm">
          {isSaving && <span className="text-slate-500">💾 Saving game...</span>}
          {gameSaved && <span className="text-green-600">✅ Game saved!</span>}
          {saveError && <span className="text-red-500">⚠️ {saveError}</span>}
        </div>
      )}
    </div>
  );
}
