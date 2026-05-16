import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export const revalidate = 0;

const categoryMeta: Record<string, { title: string; description: string; hero: string }> = {
  club: {
    title: 'Club Jerseys',
    description: "Authentic jerseys from the world's greatest clubs.",
    hero: 'https://images.unsplash.com/photo-1616124619460-ff4ed8f4683c?q=80&w=2000&auto=format&fit=crop',
  },
  national: {
    title: 'National Teams',
    description: 'Wear the colors of your nation. Premium national team kits.',
    hero: 'https://images.unsplash.com/photo-1508344928928-7165b67de128?q=80&w=2000&auto=format&fit=crop',
  },
  retro: {
    title: 'Retro Classics',
    description: "Legendary kits from football's golden eras.",
    hero: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=2000&auto=format&fit=crop',
  },
  player: {
    title: 'Player Editions',
    description: 'Match-worn standard jerseys worn by the greats.',
    hero: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=2000&auto=format&fit=crop',
  },
};

const validCategories = Object.keys(categoryMeta);

// Next.js 15: params is a Promise — must be awaited
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
  // Next.js 15: await params before destructuring
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
    <div className="min-h-screen bg-zinc-950">
      {/* Hero Banner */}
      <div className="relative w-full h-[45vh] overflow-hidden flex items-end">
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent z-10" />
        <img
          src={meta.hero}
          alt={meta.title}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-8 pb-12 w-full">
          <p className="text-zinc-400 uppercase tracking-[0.3em] text-xs font-bold mb-2">Collection</p>
          <h1 className="font-bebas text-7xl md:text-8xl tracking-wider text-white">{meta.title}</h1>
          <p className="text-zinc-400 mt-2 max-w-lg text-sm">{meta.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-10">
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-12">
          <Link
            href="/shop"
            className="px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] border border-zinc-700 text-zinc-400 hover:border-white hover:text-white transition-all"
          >
            All
          </Link>
          {validCategories.map((cat) => (
            <Link
              key={cat}
              href={`/collections/${cat}`}
              className={`px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] transition-all border ${
                cat === category
                  ? 'bg-white text-black border-white'
                  : 'border-zinc-700 text-zinc-400 hover:border-white hover:text-white'
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
              <div key={product.id} className="group flex flex-col">
                <div className="relative aspect-[3/4] bg-zinc-900 overflow-hidden mb-3">
                  {product.new_drop && (
                    <div className="absolute top-3 left-3 z-10 bg-white text-black text-[10px] font-bold px-2 py-0.5 tracking-[0.15em]">
                      NEW
                    </div>
                  )}
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
            ))}
          </div>
        ) : (
          <div className="text-center py-32 pb-24">
            <p className="font-bebas text-5xl text-zinc-700 tracking-widest mb-4">
              NO JERSEYS IN THIS CATEGORY
            </p>
            <p className="text-zinc-500 text-sm mb-8">
              Add products from the admin panel with category set to &quot;{category}&quot;.
            </p>
            <Link
              href="/shop"
              className="inline-block px-8 py-3 bg-white text-black font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors"
            >
              Browse All
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
