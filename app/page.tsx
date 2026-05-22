import Link from 'next/link';
import { ArrowRight, ShieldCheck, Truck, Banknote, HelpCircle, Camera, Flame, Trophy } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import TiltCard from '@/components/TiltCard';
import { FadeIn, StaggerContainer, StaggerItem, PageTransition } from '@/components/ScrollReveal';

// Local uploaded images (from the workspace /images folder)
import heroImg from '../images/Cristiano Ronaldo.jpg';
import ronaldoImg from '../images/ronaldo.jpg';
import messiImg from '../images/messi.jpg';
import messi2010Img from '../images/Messi in 2010_.jpg';
import neymarImg from '../images/Neymar _ 11.jpg';
import neymarAltImg from '../images/𝐍𝐄𝐘𝐌𝐀𝐑.jpg';

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
    <PageTransition>
      <main className="min-h-screen bg-dark-bg text-zinc-100 overflow-x-hidden">
        {/* ─── HERO SECTION ─────────────────────────────────────────── */}
        <section className="relative w-full h-[85vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden bg-grain">
          {/* Background Image & Editorial Overlays */}
            <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/20 via-dark-bg/60 to-dark-bg z-10" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-dark-bg/90 z-10" />
            <img
              src={(heroImg as any)?.src || heroImg}
              alt="Cristiano Ronaldo vs Lionel Messi Match"
              className="w-full h-full object-cover opacity-[0.22] scale-105"
              style={{ objectPosition: 'center 35%' }}
            />
          </div>

          {/* Content Container */}
          <div className="relative z-20 flex flex-col items-center max-w-5xl">
            {/* Eyebrow badge */}
            <FadeIn delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-6 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span className="font-barlow text-[9px] font-black tracking-[0.25em] text-accent uppercase">NEW SEASON COLLECTION LIVE</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} yOffset={35}>
              <h1 className="font-bebas text-[4.5rem] sm:text-[7rem] md:text-[10rem] leading-[0.85] tracking-tighter text-white mb-6 uppercase">
                WEAR THE <span className="text-stroke hover:text-accent select-none transition-colors duration-300">PASSION.</span>
              </h1>
            </FadeIn>
            
            <FadeIn delay={0.3} yOffset={30}>
              <p className="font-barlow text-sm sm:text-base md:text-lg font-bold tracking-[0.15em] text-zinc-400 max-w-2xl mb-12 uppercase">
                Curated high-performance kits, iconic classics & match-spec details.<br/>
                Engineered for the absolute purists of the beautiful game.
              </p>
            </FadeIn>

            <FadeIn delay={0.4} yOffset={20}>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4">
                <Link
                  href="/shop"
                  className="group relative flex items-center justify-center gap-3 bg-white text-black px-10 py-4.5 font-barlow font-black uppercase tracking-[0.2em] text-xs transition-colors duration-200 hover:bg-accent hover:text-black hover:shadow-sm"
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
            </FadeIn>
          </div>

          {/* Scroll Indicator Line */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-30 animate-bounce">
            <span className="font-barlow text-[9px] font-black tracking-widest text-zinc-500 uppercase">SCROLL</span>
            <div className="w-px h-8 bg-gradient-to-b from-white to-transparent" />
          </div>
        </section>

        {/* ─── TRUST BAR ─────────────────────────────────────────── */}
        <section className="w-full bg-dark-surface border-y border-dark-border py-10 px-4 bg-grain relative z-10">
          <FadeIn>
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
          </FadeIn>
        </section>

        {/* ─── FEATURED COLLECTIONS ──────────────────────────────── */}
        <section className="w-full max-w-7xl mx-auto py-28 px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <FadeIn>
              <p className="text-accent font-barlow uppercase tracking-[0.3em] text-xs font-black mb-3">CURATED CATEGORIES</p>
              <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl tracking-wide text-white leading-none uppercase">
                SELECT YOUR SUIT
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <Link
                href="/shop"
                className="group text-xs font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-accent transition-colors flex items-center gap-2 mt-4 md:mt-0 font-barlow"
              >
                Explore Complete Range <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </FadeIn>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredCollections.map((col) => (
              <StaggerItem key={col.id}>
                <TiltCard className="h-96">
                  <Link
                    href={col.link}
                    className="group relative w-full h-full block"
                  >
                    {/* Background Zoom Image */}
                    <img
                      src={col.image}
                      alt={col.title}
                      className="w-full h-full object-cover opacity-40 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                    
                    {/* Radial gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/95 via-dark-bg/30 to-transparent" />
                    
                    {/* Border hover effect */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent/40 transition-colors duration-500" />

                    <div className="absolute bottom-0 left-0 p-6 w-full z-20">
                      <p className="text-accent font-barlow text-[10px] font-black tracking-widest mb-2 uppercase">{col.subtitle}</p>
                      <h3 className="font-bebas text-3xl tracking-wider text-white uppercase">{col.title}</h3>
                      <div className="h-[2px] w-0 bg-accent mt-3 group-hover:w-16 transition-all duration-500" />
                    </div>
                  </Link>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* ─── LEGENDS SHOWCASE ────────────────────────────────────── */}
        <section className="w-full bg-gradient-to-b from-dark-bg via-dark-surface/10 to-dark-bg py-28 px-4 relative z-10 overflow-hidden border-t border-dark-border/40">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <FadeIn>
                <p className="text-accent font-barlow uppercase tracking-[0.3em] text-xs font-black mb-3">ICONIC NUMBERS</p>
                <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl tracking-wide text-white mb-4 uppercase">
                  THE LEGENDS COLLECTION
                </h2>
                <p className="text-zinc-500 text-sm font-barlow font-bold tracking-wider max-w-xl mx-auto uppercase">
                  Engineered for greatness. Walk in the footsteps of football's ultimate immortals.
                </p>
              </FadeIn>
            </div>

            <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {[
                {
                  name: 'CRISTIANO RONALDO',
                  jersey: 'THE ICON OF 7',
                  desc: 'Relentless power, elite precision, and unmatched longevity. Shop player-version kits of CR7, from iconic international appearances to classic club achievements.',
                  image: ronaldoImg,
                  link: '/collections/player',
                  accent: '#9CA3AF',
                  badge: 'CR7'
                },
                {
                  name: 'LIONEL MESSI',
                  jersey: 'THE GOLDEN 10',
                  desc: 'Unrivaled vision, legendary playmaking, and pure magic on the pitch. Discover premium Argentina retros and club jerseys matching the specifications of the GOAT.',
                  image: messiImg,
                  link: '/collections/retro',
                  accent: '#9CA3AF',
                  badge: 'LM10'
                },
                {
                  name: 'NEYMAR JR',
                  jersey: 'THE SAMBA SHIELD',
                  desc: 'Samba flair, dazzling dribbles, and absolute creativity. Bring the Brazilian passion to your local pitch with the authentic details of the world’s most entertaining playmaker.',
                  image: neymarImg,
                  link: '/collections/national',
                  accent: '#9CA3AF',
                  badge: 'NJ10'
                }
              ].map((legend, index) => (
                <StaggerItem key={index}>
                  <TiltCard className="h-[480px] border border-dark-border bg-dark-surface/50 hover:border-accent/40 hover:shadow-sm transition-all duration-500">
                    <div className="relative w-full h-full p-8 flex flex-col justify-end overflow-hidden group">
                      {/* Image backdrop */}
                      <div className="absolute inset-0 z-0">
                        <img
                          src={(legend.image as any)?.src || legend.image}
                          alt={legend.name}
                          className="w-full h-full object-cover opacity-20 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 ease-out"
                          style={{
                            objectPosition: legend.name.includes('MESSI')
                              ? 'center 30%'
                              : legend.name.includes('NEYMAR')
                              ? 'center 40%'
                              : 'center 25%'
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/60 to-transparent" />
                      </div>

                      {/* Content */}
                      <div className="relative z-10">
                        <span className="inline-block px-3 py-1 bg-accent/20 border border-accent/30 text-accent font-barlow text-[9px] font-black tracking-widest uppercase mb-4">
                          {legend.badge} SPECIAL
                        </span>
                        
                        <p className="text-zinc-500 font-barlow text-[10px] font-black tracking-wider uppercase mb-1">
                          {legend.jersey}
                        </p>
                        
                        <h3 className="font-bebas text-4xl tracking-wider text-white uppercase mb-3">
                          {legend.name}
                        </h3>
                        
                        <p className="text-zinc-400 font-sans text-xs leading-relaxed mb-6 line-clamp-3">
                          {legend.desc}
                        </p>
                        
                        <Link
                          href={legend.link}
                          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] font-barlow text-white hover:text-accent transition-colors group/btn"
                        >
                          View Related Kits 
                          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1.5 transition-transform duration-300 text-accent" />
                        </Link>
                      </div>
                    </div>
                  </TiltCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ─── NEW DROPS SECTION ─────────────────────────────────────────── */}
        <section className="w-full bg-dark-surface/60 border-y border-dark-border py-28 px-4 bg-grain relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
              <FadeIn>
                <div className="flex items-center gap-2 mb-3">
                  <Flame className="w-4 h-4 text-accent" />
                  <p className="text-accent font-barlow uppercase tracking-[0.3em] text-xs font-black">LATEST ARRIVALS</p>
                </div>
                <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl tracking-wide text-white leading-none uppercase">
                  HOT OFF THE PRESS
                </h2>
              </FadeIn>
              <FadeIn delay={0.15}>
                <Link
                  href="/drops"
                  className="group text-xs font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-accent transition-colors flex items-center gap-2 mt-4 md:mt-0 font-barlow"
                >
                  See All Fresh Drops <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </FadeIn>
            </div>

            {newDrops && newDrops.length > 0 ? (
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {newDrops.map((product) => (
                  <StaggerItem key={product.id}>
                    <TiltCard className="p-3">
                      <div className="group flex flex-col h-full">
                        <Link href={`/product/${product.id}`} className="relative block aspect-[3/4] bg-dark-bg overflow-hidden mb-4">
                          {/* Badge */}
                          <div className="absolute top-3 left-3 z-10 bg-accent text-black text-[9px] font-black px-2 py-0.5 tracking-wider font-barlow">
                            NEW DROP
                          </div>
                          {product.sold_out && (
                            <div className="absolute inset-0 bg-black/80 z-20 flex items-center justify-center backdrop-blur-[1px]">
                              <span className="border-2 border-accent text-accent font-bebas text-2.5xl px-6 py-2 tracking-widest rotate-[-12deg]">
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
                            <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/90 to-transparent z-20">
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
                    </TiltCard>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            ) : (
              <FadeIn>
                <div className="col-span-4 text-center py-20 border border-dashed border-dark-border">
                  <Trophy className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                  <p className="font-bebas text-3xl text-zinc-500 tracking-widest mb-2">DROPS READY TO DROP</p>
                  <p className="text-zinc-600 text-xs font-barlow font-bold">
                    Go to the admin area to add products marked as &quot;new_drop&quot;.
                  </p>
                </div>
              </FadeIn>
            )}
          </div>
        </section>

        {/* ─── INSTAGRAM / COMMUNITY WALL ────────────────────────────────────── */}
        <section className="w-full max-w-7xl mx-auto py-28 px-4 text-center relative z-10">
          <FadeIn>
            <p className="text-accent font-barlow uppercase tracking-[0.3em] text-xs font-black mb-3">#KAIZOCULTURE</p>
            <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl tracking-wide text-white mb-4 uppercase">
              JOIN THE SQUAD
            </h2>
            <p className="text-zinc-500 text-sm font-barlow font-bold tracking-wider mb-14">Tag us on Instagram to get featured wearing the colors.</p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              ronaldoImg,
              messiImg,
              neymarImg,
              heroImg,
            ].map((src, i) => (
              <StaggerItem key={i}>
                <TiltCard className="aspect-square">
                  <div className="w-full h-full relative group">
                    <img
                      src={(src as any)?.src || src}
                      alt={
                        i === 0
                          ? 'Cristiano Ronaldo playing for Portugal'
                          : i === 1
                          ? 'Lionel Messi playing for Argentina'
                          : i === 2
                          ? 'Neymar Junior playing for Brazil'
                          : 'Cristiano Ronaldo and Lionel Messi face-to-face'
                      }
                      className="w-full h-full object-cover transition-all duration-700 ease-out grayscale group-hover:grayscale-0 group-hover:scale-105"
                      style={{
                        objectPosition:
                          i === 1
                            ? 'center 30%'
                            : i === 2
                            ? 'center 40%'
                            : 'center 25%',
                        opacity: 0.5,
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 z-20">
                      <div className="p-3 bg-accent rounded-full text-black shadow-lg">
                        <Camera className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      </main>
    </PageTransition>
  );
}
