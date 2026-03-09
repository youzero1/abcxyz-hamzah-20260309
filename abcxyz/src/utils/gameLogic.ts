export type Player = 'X' | 'O';
export type BoardState = (Player | null)[];

export interface GameResult {
  winner: Player | null;
  isDraw: boolean;
  winningLine: number[] | null;
}

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function calculateResult(squares: BoardState): GameResult {
  for (const [a, b, c] of WINNING_LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a] as Player,
        isDraw: false,
        winningLine: [a, b, c],
      };
    }
  }

  const isDraw = squares.every((sq) => sq !== null);
  return {
    winner: null,
    isDraw,
    winningLine: null,
  };
}

export function getInitialBoard(): BoardState {
  return Array(9).fill(null);
}

export function formatShareText(
  playerX: string,
  playerO: string,
  winner: string | null,
  moves: number
): string {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || 'abcxyz';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  let resultText = '';
  if (winner === 'X') {
    resultText = `${playerX} (X) won!`;
  } else if (winner === 'O') {
    resultText = `${playerO} (O) won!`;
  } else {
    resultText = "It's a draw!";
  }

  return `🎮 ${appName} - Tic Tac Toe\n⚔️ ${playerX} (X) vs ${playerO} (O)\n🏆 Result: ${resultText}\n🔢 Total moves: ${moves}\n\nPlay now at ${baseUrl}/game`;
}
