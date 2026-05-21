import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Trophy } from 'lucide-react';

export const revalidate = 0;

const categoryMeta: Record<string, { title: string; description: string; hero: string }> = {
  club: {
    title: 'Club Jerseys',
    description: "Authentic & replica kits from the world's elite club giants.",
    hero: 'https://images.unsplash.com/photo-1616124619460-ff4ed8f4683c?q=80&w=2000&auto=format&fit=crop',
  },
  national: {
    title: 'National Teams',
    description: 'Represent your country. Premium grade national squad kits.',
    hero: 'https://images.unsplash.com/photo-1508344928928-7165b67de128?q=80&w=2000&auto=format&fit=crop',
  },
  retro: {
    title: 'Retro Classics',
    description: "Legendary templates and nostalgic gems from football's golden eras.",
    hero: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=2000&auto=format&fit=crop',
  },
  player: {
    title: 'Player Editions',
    description: 'Athletic-fit pro kits identical to those worn on the pitch by the greats.',
    hero: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=2000&auto=format&fit=crop',
  },
};

const validCategories = Object.keys(categoryMeta);

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const meta = categoryMeta[category];
  if (!meta) return { title: 'Not Found | KAIZO STORE' };
  return {
    title: `${meta.title} | KAIZO STORE`,
    description: meta.description,
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;

  if (!validCategories.includes(category)) {
    notFound();
  }

  const meta = categoryMeta[category];

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Hero Banner */}
      <div className="relative w-full h-[50vh] overflow-hidden flex items-end bg-grain border-b border-dark-border">
        {/* Editorial Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-dark-bg/85 z-10" />
        <img
          src={meta.hero}
          alt={meta.title}
          className="absolute inset-0 w-full h-full object-cover opacity-35 scale-102"
        />
        <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-8 pb-12 w-full">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-accent/10 border border-accent/20 rounded-full mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <p className="font-barlow text-[9px] font-black tracking-widest text-accent uppercase">COLLECTION VAULT</p>
          </div>
          <h1 className="font-bebas text-6xl md:text-8xl tracking-wider text-white uppercase leading-none">{meta.title}</h1>
          <p className="text-zinc-400 mt-3 max-w-xl text-sm font-sans leading-relaxed">{meta.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-10">
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2.5 mb-14">
          <Link
            href="/shop"
            className="px-6 py-2.5 font-barlow text-xs font-black uppercase tracking-[0.2em] border border-dark-border text-zinc-400 bg-dark-surface/40 hover:border-accent hover:text-accent transition-all duration-300"
          >
            All Kits
          </Link>
          {validCategories.map((cat) => (
            <Link
              key={cat}
              href={`/collections/${cat}`}
              className={`px-6 py-2.5 font-barlow text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 border ${
                cat === category
                  ? 'bg-accent text-black border-accent shadow-[0_0_20px_rgba(200,255,0,0.15)]'
                  : 'border-dark-border text-zinc-400 bg-dark-surface/40 hover:border-accent hover:text-accent'
              }`}
            >
              {categoryMeta[cat].title}
            </Link>
          ))}
        </div>

        {/* Products Grid */}
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-24">
            {products.map((product) => (
              <div key={product.id} className="group flex flex-col bg-dark-surface/90 border border-dark-border p-3 transition-all duration-300 hover:border-zinc-700">
                <Link href={`/product/${product.id}`} className="relative block aspect-[3/4] bg-dark-bg overflow-hidden mb-4 border border-dark-border">
                  {product.new_drop && (
                    <div className="absolute top-3 left-3 z-10 bg-accent text-black text-[9px] font-black px-2 py-0.5 tracking-wider font-barlow">
                      NEW DROP
                    </div>
                  )}
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
                    <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/90 to-transparent">
                      <span
                        className="block w-full bg-accent text-black font-barlow font-black uppercase tracking-widest py-3 text-xs hover:bg-white transition-colors text-center shadow-lg"
                      >
                        BUY NOW
                      </span>
                    </div>
                  )}
                </Link>
                <div className="px-1 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-barlow text-sm font-black tracking-wide text-zinc-200 group-hover:text-accent transition-colors line-clamp-2 leading-tight mb-2">
                      {product.name}
                    </h3>
                  </div>
                  <p className="text-white font-barlow font-bold text-sm">₹{product.price?.toLocaleString('en-IN')}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 border border-dashed border-dark-border mb-24">
            <Trophy className="w-14 h-14 text-zinc-700 mx-auto mb-4" />
            <p className="font-bebas text-4xl text-zinc-500 tracking-widest mb-3">COLLECTION STAGING</p>
            <p className="text-zinc-600 text-sm font-barlow font-bold max-w-sm mx-auto mb-8">No products found under &quot;{category}&quot;. Edit products in the admin panel to add them to this category.</p>
            <Link
              href="/shop"
              className="inline-block px-10 py-4 bg-white text-black font-barlow font-black uppercase tracking-widest hover:bg-accent transition-colors"
            >
              Browse Shop
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
