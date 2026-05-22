import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Flame, Trophy } from 'lucide-react';
import TiltCard from '@/components/TiltCard';
import { FadeIn, StaggerContainer, StaggerItem, PageTransition } from '@/components/ScrollReveal';

export const revalidate = 0;

export const metadata = {
  title: 'New Drops | KAIZO STORE',
  description: 'Latest football jersey drops. Limited stock arrivals just landed.',
};

export default async function DropsPage() {
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('new_drop', true)
    .order('created_at', { ascending: false });

  return (
    <PageTransition>
      <div className="min-h-screen bg-dark-bg px-4 py-16 bg-grain">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-20 text-center relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 font-bebas text-[10vw] text-white/[0.01] tracking-[0.2em] pointer-events-none select-none uppercase">
              LIMITED RELEASE
            </div>
            
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full mb-4">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <p className="font-barlow text-[10px] font-black tracking-widest text-accent uppercase">IN STOCK & DISPATCHING NOW</p>
              </div>

              <h1 className="font-bebas text-7xl md:text-9xl tracking-wider text-white mb-6 uppercase">NEW DROPS</h1>
              
              <div className="flex items-center justify-center gap-4">
                <div className="h-[1px] bg-dark-border w-24" />
                <span className="flex items-center gap-1.5 px-4 py-1.5 bg-accent text-black font-barlow text-xs font-black uppercase tracking-[0.25em]">
                  <Flame className="w-3.5 h-3.5" /> CURRENT SELECTION
                </span>
                <div className="h-[1px] bg-dark-border w-24" />
              </div>
            </FadeIn>
          </div>

          {/* Drops Grid */}
          {products && products.length > 0 ? (
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <StaggerItem key={product.id}>
                  <TiltCard className="p-3 h-full">
                    <div className="group flex flex-col h-full">
                      <Link href={`/product/${product.id}`} className="relative block aspect-[3/4] bg-dark-bg overflow-hidden mb-4 border border-dark-border">
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
                          src={product.image_url || 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=600&auto=format&fit=crop'}
                          alt={product.name}
                          className={`w-full h-full object-cover transition-transform duration-700 ease-out ${!product.sold_out ? 'group-hover:scale-105' : ''}`}
                        />
                        {!product.sold_out && (
                          <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/90 to-transparent z-20">
                            <span
                              className="block w-full bg-accent text-black font-barlow font-black uppercase tracking-widest py-3 text-xs hover:bg-dark-surface-hover hover:text-white transition-colors text-center shadow-sm"
                            >
                              BUY NOW
                            </span>
                          </div>
                        )}
                      </Link>
                      <div className="px-1 flex flex-col justify-between flex-grow">
                        <div>
                          <Link href={`/product/${product.id}`} className="group/title">
                            <h3 className="font-barlow text-sm font-black tracking-wide text-zinc-200 group-hover/title:text-accent transition-colors line-clamp-2 leading-tight mb-2">
                              {product.name}
                            </h3>
                          </Link>
                        </div>
                        <p className="text-white font-barlow font-bold text-sm">₹{product.price?.toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  </TiltCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <FadeIn>
              <div className="text-center py-24 border border-dashed border-dark-border">
                <Trophy className="w-14 h-14 text-zinc-700 mx-auto mb-4" />
                <p className="font-bebas text-4xl text-zinc-500 tracking-widest mb-3">NEXT DROP IMMINENT</p>
                <p className="text-zinc-600 text-sm font-barlow font-bold max-w-sm mx-auto">Our squad is compiling the next generation kit vault. Check back shortly for the refresh.</p>
              </div>
            </FadeIn>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
