'use client';

import { useState } from 'react';
import { formatShareText } from '@/utils/gameLogic';

interface ShareButtonProps {
  playerX: string;
  playerO: string;
  winner: string | null;
  moveCount: number;
}

export default function ShareButton({ playerX, playerO, winner, moveCount }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const text = formatShareText(playerX, playerO, winner, moveCount);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <button
      onClick={handleShare}
      className={`font-semibold py-2 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        copied
          ? 'bg-green-500 text-white focus:ring-green-400'
          : 'bg-indigo-500 hover:bg-indigo-600 text-white focus:ring-indigo-400'
      }`}
    >
      {copied ? '✅ Copied!' : '🔗 Share Result'}
    </button>
  );
}
