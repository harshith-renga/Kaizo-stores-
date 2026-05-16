import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-4 text-center">
      <p className="text-zinc-600 uppercase tracking-[0.4em] text-xs font-bold mb-6">KAIZO STORE — ERROR</p>
      <h1 className="font-bebas text-[10rem] md:text-[16rem] leading-none text-white tracking-tighter opacity-10 select-none absolute">
        404
      </h1>
      <div className="relative z-10">
        <h2 className="font-bebas text-5xl md:text-7xl tracking-widest text-white mb-4">PAGE NOT FOUND</h2>
        <p className="text-zinc-500 max-w-md mb-10 text-sm leading-relaxed">
          This page doesn&apos;t exist or has been removed. Head back to the store and keep the culture alive.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/shop"
            className="px-8 py-4 border border-zinc-700 text-white font-bold uppercase tracking-widest hover:border-white transition-colors"
          >
            Shop Jerseys
          </Link>
        </div>
      </div>
    </div>
  );
}
