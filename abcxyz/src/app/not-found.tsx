import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="text-8xl mb-6">🎯</div>
      <h2 className="text-4xl font-extrabold text-slate-800 mb-4">404 — Not Found</h2>
      <p className="text-slate-500 mb-8 text-lg">Looks like this square is empty!</p>
      <Link href="/" className="btn-primary text-lg px-8 py-3">
        Go Home
      </Link>
    </div>
  );
}
