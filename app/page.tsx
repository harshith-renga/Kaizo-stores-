import Link from 'next/link';
import { ArrowRight, ShieldCheck, Truck, Banknote, HelpCircle, Camera } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export const revalidate = 0;

export const metadata = {
  title: 'KAIZO STORE | Premium Football Jerseys',
  description: 'Premium football jerseys for real fans. Shop authentic kits from top clubs and national teams.',
};

const featuredCollections = [
  {
    id: 1,
    title: 'Club Jerseys',
    subtitle: 'Top clubs worldwide',
    image: 'https://images.unsplash.com/photo-1616124619460-ff4ed8f4683c?q=80&w=1000&auto=format&fit=crop',
    link: '/collections/club',
  },
  {
    id: 2,
    title: 'National Teams',
    subtitle: 'Wear your nation',
    image: 'https://images.unsplash.com/photo-1508344928928-7165b67de128?q=80&w=1000&auto=format&fit=crop',
    link: '/collections/national',
  },
  {
    id: 3,
    title: 'Retro Classics',
    subtitle: "Football's golden eras",
    image: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=1000&auto=format&fit=crop',
    link: '/collections/retro',
  },
  {
    id: 4,
    title: 'Player Editions',
    subtitle: 'Match-worn standard',
    image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=1000&auto=format&fit=crop',
    link: '/collections/player',
  },
];

export default async function Home() {
  const { data: newDrops } = await supabase
    .from('products')
    .select('*')
    .eq('new_drop', true)
    .order('created_at', { ascending: false })
    .limit(4);

  return (
    <main>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative w-full h-[92vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden">
        {/* BG */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-zinc-950/10 z-10" />
          <img
            src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=3000&auto=format&fit=crop"
            alt="Football Stadium"
            className="w-full h-full object-cover opacity-50"
          />
        </div>

        <div className="relative z-20 flex flex-col items-center max-w-5xl">
          <p className="text-zinc-400 uppercase tracking-[0.4em] text-xs font-bold mb-6">Premium Football Culture</p>
          <h1 className="font-bebas text-[5rem] sm:text-[8rem] md:text-[11rem] leading-none tracking-tight text-white mb-6">
            WEAR THE GAME.
          </h1>
          <p className="text-zinc-300 text-base md:text-xl font-light tracking-wide max-w-xl mb-10">
            Authentic jerseys. Legendary kits. Premium quality delivered to your door.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/shop"
              className="group flex items-center justify-center gap-3 bg-white text-black px-10 py-4 font-bold uppercase tracking-[0.2em] text-sm hover:bg-zinc-100 transition-all"
            >
              Shop Jerseys
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/drops"
              className="flex items-center justify-center gap-3 border border-zinc-600 text-white px-10 py-4 font-bold uppercase tracking-[0.2em] text-sm hover:border-white hover:bg-white/5 transition-all"
            >
              New Drops
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-50">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-white" />
        </div>
      </section>

      {/* ─── TRUST BAR ─────────────────────────────────────────── */}
      <section className="w-full bg-zinc-900 border-y border-zinc-800 py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: ShieldCheck, title: 'Authentic Quality', sub: 'Genuine premium kits' },
            { icon: Truck, title: 'Fast Shipping', sub: 'Pan-India delivery' },
            { icon: Banknote, title: 'Cash on Delivery', sub: 'Pay when received' },
            { icon: HelpCircle, title: 'WhatsApp Support', sub: '24/7 instant help' },
          ].map(({ icon: Icon, title, sub }) => (
            <div key={title} className="flex flex-col items-center gap-2 py-2">
              <Icon className="w-6 h-6 text-zinc-400" />
              <h3 className="font-bebas text-lg tracking-widest text-white">{title}</h3>
              <p className="text-zinc-500 text-xs">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FEATURED COLLECTIONS ──────────────────────────────── */}
      <section className="w-full max-w-7xl mx-auto py-24 px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <p className="text-zinc-500 uppercase tracking-[0.3em] text-xs font-bold mb-2">Browse</p>
            <h2 className="font-bebas text-5xl md:text-6xl tracking-wide">Featured Collections</h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors flex items-center gap-2 mt-4 md:mt-0"
          >
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredCollections.map((col) => (
            <Link
              key={col.id}
              href={col.link}
              className="group relative h-80 overflow-hidden bg-zinc-900 block"
            >
              <img
                src={col.image}
                alt={col.title}
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <p className="text-zinc-400 text-xs uppercase tracking-widest mb-1">{col.subtitle}</p>
                <h3 className="font-bebas text-2xl tracking-widest text-white">{col.title}</h3>
                <div className="h-px w-0 bg-white mt-2 group-hover:w-10 transition-all duration-500" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── NEW DROPS ─────────────────────────────────────────── */}
      <section className="w-full bg-zinc-900/50 py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <p className="text-zinc-500 uppercase tracking-[0.3em] text-xs font-bold mb-2">Just Landed</p>
              <h2 className="font-bebas text-5xl md:text-6xl tracking-wide flex items-center gap-4">
                Latest Drops
                <span className="px-2 py-0.5 bg-red-600 text-white text-sm font-sans font-bold tracking-widest">NEW</span>
              </h2>
            </div>
            <Link
              href="/drops"
              className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors flex items-center gap-2 mt-4 md:mt-0"
            >
              All Drops <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newDrops && newDrops.length > 0 ? (
              newDrops.map((product) => (
                <div key={product.id} className="group flex flex-col">
                  <div className="relative aspect-[3/4] bg-zinc-800 overflow-hidden mb-3">
                    <div className="absolute top-3 left-3 z-10 bg-white text-black text-[10px] font-bold px-2 py-0.5 tracking-[0.15em]">
                      NEW
                    </div>
                    {product.sold_out && (
                      <div className="absolute inset-0 bg-black/65 z-20 flex items-center justify-center backdrop-blur-[2px]">
                        <span className="border-2 border-white text-white font-bebas text-xl px-5 py-1.5 tracking-widest rotate-[-15deg]">
                          SOLD OUT
                        </span>
                      </div>
                    )}
                    <img
                      src={
                        product.image_url ||
                        'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=600&auto=format&fit=crop'
                      }
                      alt={product.name}
                      className={`w-full h-full object-cover transition-transform duration-700 ${
                        !product.sold_out ? 'group-hover:scale-110' : ''
                      }`}
                    />
                    {!product.sold_out && (
                      <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/90 to-transparent">
                        <Link
                          href={`/product/${product.id}`}
                          className="block w-full bg-white text-black font-bold uppercase tracking-widest py-3 text-xs hover:bg-zinc-200 transition-colors text-center"
                        >
                          View Details
                        </Link>
                      </div>
                    )}
                  </div>
                  <Link href={`/product/${product.id}`} className="group/title">
                    <h3 className="font-medium text-zinc-200 text-sm leading-snug mb-1 group-hover/title:text-white transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-zinc-500 text-sm">₹{product.price?.toLocaleString('en-IN')}</p>
                </div>
              ))
            ) : (
              <div className="col-span-4 text-center py-20">
                <p className="font-bebas text-3xl text-zinc-700 tracking-widest mb-3">DROPS COMING SOON</p>
                <p className="text-zinc-600 text-sm">
                  Run the <code className="text-zinc-400">supabase_schema.sql</code> script to seed your store.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── INSTAGRAM WALL ────────────────────────────────────── */}
      <section className="w-full max-w-7xl mx-auto py-24 px-4 text-center">
        <p className="text-zinc-500 uppercase tracking-[0.3em] text-xs font-bold mb-3">Follow the Culture</p>
        <h2 className="font-bebas text-5xl md:text-6xl tracking-wide mb-3">@KAIZOSTORE</h2>
        <p className="text-zinc-500 text-sm mb-12">Tag us in your fit. Get featured.</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            'https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1487466365202-1afdb86c764e?q=80&w=600&auto=format&fit=crop',
          ].map((src, i) => (
            <div key={i} className="aspect-square bg-zinc-900 group relative overflow-hidden">
              <img
                src={src}
                alt={`Community post ${i + 1}`}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                <Camera className="w-8 h-8 text-white drop-shadow-lg" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
