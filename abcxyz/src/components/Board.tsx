'use client';

import Square from './Square';
import { BoardState } from '@/utils/gameLogic';

interface BoardProps {
  squares: BoardState;
  winningLine: number[] | null;
  onSquareClick: (index: number) => void;
  disabled: boolean;
}

export default function Board({ squares, winningLine, onSquareClick, disabled }: BoardProps) {
  return (
    <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
      {squares.map((square, i) => (
        <Square
          key={i}
          value={square}
          onClick={() => onSquareClick(i)}
          isWinning={winningLine ? winningLine.includes(i) : false}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
