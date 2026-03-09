'use client';

import { Player } from '@/utils/gameLogic';

interface SquareProps {
  value: Player | null;
  onClick: () => void;
  isWinning: boolean;
  disabled: boolean;
}

export default function Square({ value, onClick, isWinning, disabled }: SquareProps) {
  const baseClasses =
    'w-full aspect-square flex items-center justify-center text-4xl font-extrabold rounded-2xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400 select-none';

  let colorClasses = '';
  if (isWinning) {
    colorClasses =
      value === 'X'
        ? 'bg-primary-100 border-primary-400 text-primary-600 scale-105 shadow-lg'
        : 'bg-rose-100 border-rose-400 text-rose-500 scale-105 shadow-lg';
  } else if (value === 'X') {
    colorClasses = 'bg-primary-50 border-primary-200 text-primary-600';
  } else if (value === 'O') {
    colorClasses = 'bg-rose-50 border-rose-200 text-rose-500';
  } else if (!disabled) {
    colorClasses =
      'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300 cursor-pointer hover:scale-105';
  } else {
    colorClasses = 'bg-white border-slate-200 cursor-not-allowed opacity-60';
  }

  return (
    <button
      className={`${baseClasses} ${colorClasses}`}
      onClick={onClick}
      disabled={disabled || !!value}
      aria-label={value ? `Square filled with ${value}` : 'Empty square'}
    >
      {value}
    </button>
  );
}
