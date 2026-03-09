'use client';

import { useState, useEffect, useCallback } from 'react';
import Board from '@/components/Board';
import GameStatus from '@/components/GameStatus';
import PlayerInfo from '@/components/PlayerInfo';
import ShareButton from '@/components/ShareButton';
import { calculateResult, getInitialBoard, BoardState, Player } from '@/utils/gameLogic';

interface MoveRecord {
  index: number;
  player: Player;
}

export default function GamePage() {
  const [squares, setSquares] = useState<BoardState>(getInitialBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [moveHistory, setMoveHistory] = useState<MoveRecord[]>([]);
  const [playerX, setPlayerX] = useState('');
  const [playerO, setPlayerO] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [gameSaved, setGameSaved] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const result = calculateResult(squares);
  const gameOver = result.winner !== null || result.isDraw;

  const saveGame = useCallback(async () => {
    if (!gameStarted || gameSaved || isSaving) return;
    setIsSaving(true);
    setSaveError('');
    try {
      const winnerValue = result.winner ? result.winner : result.isDraw ? 'draw' : null;
      const response = await fetch('/api/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerX,
          playerO,
          winner: winnerValue,
          moves: moveHistory,
        }),
      });
      if (response.ok) {
        setGameSaved(true);
      } else {
        const data = await response.json();
        setSaveError(data.error || 'Failed to save game');
      }
    } catch {
      setSaveError('Network error while saving game');
    } finally {
      setIsSaving(false);
    }
  }, [gameStarted, gameSaved, isSaving, result, playerX, playerO, moveHistory]);

  useEffect(() => {
    if (gameOver && gameStarted && !gameSaved) {
      saveGame();
    }
  }, [gameOver, gameStarted, gameSaved, saveGame]);

  const handleSquareClick = (index: number) => {
    if (!gameStarted || squares[index] || gameOver) return;

    const newSquares = [...squares];
    newSquares[index] = currentPlayer;
    const newMove: MoveRecord = { index, player: currentPlayer };

    setSquares(newSquares);
    setMoveHistory((prev) => [...prev, newMove]);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const handleStartGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerX.trim() || !playerO.trim()) return;
    setGameStarted(true);
  };

  const handleReset = () => {
    setSquares(getInitialBoard());
    setCurrentPlayer('X');
    setMoveHistory([]);
    setGameSaved(false);
    setSaveError('');
    setIsSaving(false);
    setGameStarted(false);
    setPlayerX('');
    setPlayerO('');
  };

  const handlePlayAgain = () => {
    setSquares(getInitialBoard());
    setCurrentPlayer('X');
    setMoveHistory([]);
    setGameSaved(false);
    setSaveError('');
    setIsSaving(false);
  };

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <div className="card w-full max-w-md">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">🎮 New Game</h2>
          <form onSubmit={handleStartGame} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1">
                Player X Name
              </label>
              <input
                type="text"
                value={playerX}
                onChange={(e) => setPlayerX(e.target.value)}
                placeholder="Enter Player X name"
                maxLength={20}
                className="w-full border-2 border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:border-primary-400 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1">
                Player O Name
              </label>
              <input
                type="text"
                value={playerO}
                onChange={(e) => setPlayerO(e.target.value)}
                placeholder="Enter Player O name"
                maxLength={20}
                className="w-full border-2 border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:border-primary-400 transition-colors"
                required
              />
            </div>
            <button type="submit" className="btn-primary w-full py-3 text-lg">
              Start Game
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
        abc<span className="text-primary-600">xyz</span>
      </h2>

      <div className="flex gap-4 w-full max-w-md justify-between">
        <PlayerInfo
          name={playerX}
          symbol="X"
          isActive={!gameOver && currentPlayer === 'X'}
          color="primary"
        />
        <div className="flex items-center text-2xl font-bold text-slate-400">vs</div>
        <PlayerInfo
          name={playerO}
          symbol="O"
          isActive={!gameOver && currentPlayer === 'O'}
          color="rose"
        />
      </div>

      <GameStatus
        result={result}
        currentPlayer={currentPlayer}
        playerX={playerX}
        playerO={playerO}
        gameOver={gameOver}
        isSaving={isSaving}
        gameSaved={gameSaved}
        saveError={saveError}
      />

      <Board
        squares={squares}
        winningLine={result.winningLine}
        onSquareClick={handleSquareClick}
        disabled={gameOver || !gameStarted}
      />

      <div className="flex flex-wrap gap-3 justify-center">
        {gameOver && (
          <>
            <ShareButton
              playerX={playerX}
              playerO={playerO}
              winner={result.winner ? result.winner : result.isDraw ? 'draw' : null}
              moveCount={moveHistory.length}
            />
            <button onClick={handlePlayAgain} className="btn-primary">
              🔄 Play Again
            </button>
          </>
        )}
        <button onClick={handleReset} className="btn-secondary">
          🏠 New Players
        </button>
      </div>

      {moveHistory.length > 0 && (
        <div className="card w-full max-w-md">
          <h3 className="font-bold text-slate-700 mb-3">📋 Move History</h3>
          <div className="grid grid-cols-2 gap-1 max-h-40 overflow-y-auto">
            {moveHistory.map((move, i) => (
              <div
                key={i}
                className={`text-sm px-2 py-1 rounded-md font-medium ${
                  move.player === 'X'
                    ? 'bg-primary-50 text-primary-700'
                    : 'bg-rose-50 text-rose-700'
                }`}
              >
                Move {i + 1}: {move.player} → Square {move.index + 1}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
