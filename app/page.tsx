import Link from 'next/link';
import { ArrowRight, ShieldCheck, Truck, Banknote, HelpCircle, Camera, Flame, Trophy } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export const revalidate = 0;

export const metadata = {
  title: 'KAIZO STORE | Premium Football Jerseys & Retro Kits',
  description: 'Premium football jerseys, retro classics, player editions and national kits. Experience authentic quality and fast shipping.',
};

const featuredCollections = [
  {
    id: 1,
    title: 'Club Jerseys',
    subtitle: 'ELITE CLUBS WORLDWIDE',
    image: 'https://images.unsplash.com/photo-1616124619460-ff4ed8f4683c?q=80&w=1000&auto=format&fit=crop',
    link: '/collections/club',
  },
  {
    id: 2,
    title: 'National Teams',
    subtitle: 'WEAR YOUR NATION\'S COLORS',
    image: 'https://images.unsplash.com/photo-1508344928928-7165b67de128?q=80&w=1000&auto=format&fit=crop',
    link: '/collections/national',
  },
  {
    id: 3,
    title: 'Retro Classics',
    subtitle: 'GOLDEN ERA OF FOOTBALL',
    image: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=1000&auto=format&fit=crop',
    link: '/collections/retro',
  },
  {
    id: 4,
    title: 'Player Editions',
    subtitle: 'PRO-LEVEL MATCH SPECIFICATIONS',
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
    <main className="min-h-screen bg-dark-bg text-zinc-100 overflow-x-hidden">
      {/* ─── HERO SECTION ─────────────────────────────────────────── */}
      <section className="relative w-full h-[85vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden bg-grain">
        {/* Background Image & Editorial Overlays */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/20 via-dark-bg/60 to-dark-bg z-10" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent to-dark-bg/90 z-10" />
          <img
            src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=3000&auto=format&fit=crop"
            alt="Football Stadium Dark Aesthetic"
            className="w-full h-full object-cover opacity-35 scale-105 animate-[pulse_10s_infinite_alternate]"
          />
        </div>

        {/* Content Container */}
        <div className="relative z-20 flex flex-col items-center max-w-5xl">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            <span className="font-barlow text-[9px] font-black tracking-[0.25em] text-accent uppercase">NEW SEASON COLLECTION LIVE</span>
          </div>

          <h1 className="font-bebas text-[4.5rem] sm:text-[7rem] md:text-[10rem] leading-[0.85] tracking-tighter text-white mb-6 uppercase">
            WEAR THE <span className="text-stroke hover:text-accent select-none">PASSION.</span>
          </h1>
          
          <p className="font-barlow text-sm sm:text-base md:text-lg font-bold tracking-[0.15em] text-zinc-400 max-w-2xl mb-12 uppercase">
            Curated high-performance kits, iconic classics & match-spec details.<br/>
            Engineered for the absolute purists of the beautiful game.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4">
            <Link
              href="/shop"
              className="group relative flex items-center justify-center gap-3 bg-white text-black px-10 py-4.5 font-barlow font-black uppercase tracking-[0.2em] text-xs transition-all duration-300 hover:bg-accent hover:text-black hover:shadow-[0_0_30px_rgba(200,255,0,0.25)]"
            >
              Shop All Kits
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
            <Link
              href="/drops"
              className="flex items-center justify-center gap-3 border-2 border-zinc-700 text-white px-10 py-4.5 font-barlow font-black uppercase tracking-[0.2em] text-xs transition-all duration-300 hover:border-accent hover:bg-accent/5 hover:text-accent"
            >
              View New Drops
              <Flame className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Scroll Indicator Line */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-30 animate-bounce">
          <span className="font-barlow text-[9px] font-black tracking-widest text-zinc-500 uppercase">SCROLL</span>
          <div className="w-px h-8 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* ─── TRUST BAR ─────────────────────────────────────────── */}
      <section className="w-full bg-dark-surface border-y border-dark-border py-10 px-4 bg-grain relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: ShieldCheck, title: 'AUTHENTIC REPLICA & PLAYER SPEC', sub: 'Genuine grade badges & detailing' },
            { icon: Truck, title: 'SECURE PAN-INDIA SHIPPING', sub: 'Dispatched with tracking alerts' },
            { icon: Banknote, title: 'CASH ON DELIVERY (COD)', sub: 'Pay securely at your doorstep' },
            { icon: HelpCircle, title: '24/7 WHATSAPP SUPPORT', sub: 'Live sizing and support desk' },
          ].map(({ icon: Icon, title, sub }) => (
            <div key={title} className="flex gap-4 items-start border-l border-zinc-800 pl-4 py-2 first:border-l-0">
              <Icon className="w-8 h-8 text-accent shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <h3 className="font-barlow text-sm font-black tracking-wider text-white uppercase">{title}</h3>
                <p className="text-zinc-500 text-xs font-bold font-barlow tracking-wider mt-1">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FEATURED COLLECTIONS ──────────────────────────────── */}
      <section className="w-full max-w-7xl mx-auto py-28 px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <p className="text-accent font-barlow uppercase tracking-[0.3em] text-xs font-black mb-3">CURATED CATEGORIES</p>
            <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl tracking-wide text-white leading-none uppercase">
              SELECT YOUR SUIT
            </h2>
          </div>
          <Link
            href="/shop"
            className="group text-xs font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-accent transition-colors flex items-center gap-2 mt-4 md:mt-0 font-barlow"
          >
            Explore Complete Range <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredCollections.map((col) => (
            <Link
              key={col.id}
              href={col.link}
              className="group relative h-96 overflow-hidden bg-dark-surface border border-dark-border block"
            >
              {/* Background Zoom Image */}
              <img
                src={col.image}
                alt={col.title}
                className="w-full h-full object-cover opacity-45 group-hover:opacity-85 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              
              {/* Radial gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/95 via-dark-bg/30 to-transparent" />
              
              {/* Border hover effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent/40 transition-colors duration-500" />

              <div className="absolute bottom-0 left-0 p-6 w-full">
                <p className="text-accent font-barlow text-[10px] font-black tracking-widest mb-2 uppercase">{col.subtitle}</p>
                <h3 className="font-bebas text-3xl tracking-wider text-white uppercase">{col.title}</h3>
                <div className="h-[2px] w-0 bg-accent mt-3 group-hover:w-16 transition-all duration-500" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── NEW DROPS SECTION ─────────────────────────────────────────── */}
      <section className="w-full bg-dark-surface/60 border-y border-dark-border py-28 px-4 bg-grain relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Flame className="w-4 h-4 text-accent animate-pulse" />
                <p className="text-accent font-barlow uppercase tracking-[0.3em] text-xs font-black">LATEST ARRIVALS</p>
              </div>
              <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl tracking-wide text-white leading-none uppercase">
                HOT OFF THE PRESS
              </h2>
            </div>
            <Link
              href="/drops"
              className="group text-xs font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-accent transition-colors flex items-center gap-2 mt-4 md:mt-0 font-barlow"
            >
              See All Fresh Drops <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newDrops && newDrops.length > 0 ? (
              newDrops.map((product) => (
                <div key={product.id} className="group flex flex-col bg-dark-surface/90 border border-dark-border p-3 transition-all duration-300 hover:border-zinc-700">
                  <Link href={`/product/${product.id}`} className="relative block aspect-[3/4] bg-dark-bg overflow-hidden mb-4">
                    {/* Badge */}
                    <div className="absolute top-3 left-3 z-10 bg-accent text-black text-[9px] font-black px-2 py-0.5 tracking-wider font-barlow">
                      NEW DROP
                    </div>
                    {product.sold_out && (
                      <div className="absolute inset-0 bg-black/80 z-20 flex items-center justify-center backdrop-blur-[1px]">
                        <span className="border-2 border-accent text-accent font-bebas text-2xl px-6 py-2 tracking-widest rotate-[-12deg]">
                          OUT OF STOCK
                        </span>
                      </div>
                    )}
                    <img
                      src={
                        product.image_url ||
                        'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=600&auto=format&fit=crop'
                      }
                      alt={product.name}
                      className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                        !product.sold_out ? 'group-hover:scale-105' : ''
                      }`}
                    />
                    {!product.sold_out && (
                      <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/90 to-transparent">
                        <span
                          className="block w-full bg-accent text-black font-barlow font-black uppercase tracking-widest py-3 text-xs hover:bg-white transition-colors text-center shadow-lg"
                        >
                          BUY NOW
                        </span>
                      </div>
                    )}
                  </Link>
                  <Link href={`/product/${product.id}`} className="group/title">
                    <h3 className="font-barlow text-sm font-black tracking-wide text-zinc-200 group-hover/title:text-accent transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-white font-barlow font-bold text-sm mt-1.5">₹{product.price?.toLocaleString('en-IN')}</p>
                </div>
              ))
            ) : (
              <div className="col-span-4 text-center py-20 border border-dashed border-dark-border">
                <Trophy className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                <p className="font-bebas text-3xl text-zinc-500 tracking-widest mb-2">DROPS READY TO DROP</p>
                <p className="text-zinc-600 text-xs font-barlow font-bold">
                  Go to the admin area to add products marked as &quot;new_drop&quot;.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── INSTAGRAM / COMMUNITY WALL ────────────────────────────────────── */}
      <section className="w-full max-w-7xl mx-auto py-28 px-4 text-center relative z-10">
        <p className="text-accent font-barlow uppercase tracking-[0.3em] text-xs font-black mb-3">#KAIZOCULTURE</p>
        <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl tracking-wide text-white mb-4 uppercase">
          JOIN THE SQUAD
        </h2>
        <p className="text-zinc-500 text-sm font-barlow font-bold tracking-wider mb-14">Tag us on Instagram to get featured wearing the colors.</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            'https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1487466365202-1afdb86c764e?q=80&w=600&auto=format&fit=crop',
          ].map((src, i) => (
            <div key={i} className="aspect-square bg-dark-surface border border-dark-border group relative overflow-hidden">
              <img
                src={src}
                alt={`Kaizo Community Kit ${i + 1}`}
                className="w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-all duration-700 ease-out grayscale group-hover:grayscale-0 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                <div className="p-3 bg-accent rounded-full text-black shadow-lg">
                  <Camera className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
