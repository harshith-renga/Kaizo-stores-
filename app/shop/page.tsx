import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Trophy } from 'lucide-react';

export const revalidate = 0;

export const metadata = {
  title: 'Shop All Jerseys | KAIZO STORE',
  description: 'Browse our full collection of premium football jerseys. Worldwide club and national team kits available.',
};

export default async function ShopPage() {
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  const categories = ['all', 'club', 'national', 'retro', 'player'];

  return (
    <div className="min-h-screen bg-dark-bg px-4 py-16 bg-grain">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <p className="text-accent font-barlow uppercase tracking-[0.3em] text-xs font-black mb-3">CURATED EQUIPMENT</p>
          <h1 className="font-bebas text-6xl md:text-8xl tracking-wider text-white mb-4 uppercase">ALL JERSEYS</h1>
          <div className="h-[2px] bg-dark-border w-full" />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2.5 mb-14">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={cat === 'all' ? '/shop' : `/collections/${cat}`}
              className={`px-6 py-2.5 font-barlow text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 border ${
                cat === 'all'
                  ? 'bg-accent text-black border-accent shadow-[0_0_20px_rgba(200,255,0,0.15)]'
                  : 'border-dark-border text-zinc-400 bg-dark-surface/60 hover:border-accent hover:text-accent'
              }`}
            >
              {cat === 'all' ? 'All Kits' : cat === 'club' ? 'Clubs' : cat === 'national' ? 'National Teams' : cat === 'retro' ? 'Retro Classics' : 'Player Editions'}
            </Link>
          ))}
        </div>

        {/* Products Grid */}
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 border border-dashed border-dark-border">
            <Trophy className="w-14 h-14 text-zinc-700 mx-auto mb-4" />
            <p className="font-bebas text-4xl text-zinc-500 tracking-widest mb-3">JERSEY VAULT EMPTY</p>
            <p className="text-zinc-600 text-sm font-barlow font-bold mb-8">Deploy your Supabase schema or seed initial mock items.</p>
            <Link href="/admin/products/new" className="inline-block px-10 py-4 bg-white text-black font-barlow font-black uppercase tracking-widest hover:bg-accent transition-colors">
              Add New Product
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: any }) {
  return (
    <div className="group flex flex-col bg-dark-surface/90 border border-dark-border p-3 transition-all duration-300 hover:border-zinc-700">
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
          src={product.image_url || 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=600&auto=format&fit=crop'}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out ${!product.sold_out ? 'group-hover:scale-105' : ''}`}
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
  );
}
