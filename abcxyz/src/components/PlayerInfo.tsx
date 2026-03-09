'use client';

interface PlayerInfoProps {
  name: string;
  symbol: 'X' | 'O';
  isActive: boolean;
  color: 'primary' | 'rose';
}

const AVATARS: Record<string, string> = {
  default: '🧑',
  cool: '😎',
  ninja: '🥷',
  robot: '🤖',
  alien: '👽',
  fire: '🔥',
};

export default function PlayerInfo({ name, symbol, isActive, color }: PlayerInfoProps) {
  const colorClasses =
    color === 'primary'
      ? 'border-primary-300 bg-primary-50 text-primary-700'
      : 'border-rose-300 bg-rose-50 text-rose-700';

  const activeClasses = isActive ? 'ring-2 ring-offset-2 ' + (color === 'primary' ? 'ring-primary-400' : 'ring-rose-400') : '';

  return (
    <div
      className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-200 flex-1 ${
        colorClasses
      } ${activeClasses}`}
    >
      <div className="text-3xl mb-1">{AVATARS['default']}</div>
      <div className="font-bold text-sm truncate max-w-[80px] text-center" title={name}>
        {name}
      </div>
      <div className="font-extrabold text-lg">{symbol}</div>
      {isActive && (
        <div className="text-xs font-semibold mt-1 animate-pulse">
          ● Your turn
        </div>
      )}
    </div>
  );
}
