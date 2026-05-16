import Link from 'next/link';
import { ArrowRight, Filter } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export const revalidate = 0;

export const metadata = {
  title: 'Shop All Jerseys | KAIZO STORE',
  description: 'Browse our full collection of premium football jerseys.',
};

export default async function ShopPage() {
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  const categories = ['all', 'club', 'national', 'retro', 'player'];

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="text-zinc-500 uppercase tracking-[0.3em] text-xs font-bold mb-3">KAIZO STORE</p>
          <h1 className="font-bebas text-7xl md:text-8xl tracking-wider text-white mb-4">ALL JERSEYS</h1>
          <div className="h-px bg-zinc-800 w-full" />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={cat === 'all' ? '/shop' : `/collections/${cat}`}
              className={`px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] transition-all border ${
                cat === 'all'
                  ? 'bg-white text-black border-white'
                  : 'border-zinc-700 text-zinc-400 hover:border-white hover:text-white'
              }`}
            >
              {cat === 'all' ? 'All' : cat === 'club' ? 'Club' : cat === 'national' ? 'National' : cat === 'retro' ? 'Retro' : 'Player Editions'}
            </Link>
          ))}
        </div>

        {/* Products Grid */}
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32">
            <p className="font-bebas text-4xl text-zinc-700 tracking-widest mb-4">NO JERSEYS YET</p>
            <p className="text-zinc-500 text-sm mb-8">Run the Supabase schema script to seed the database.</p>
            <Link href="/admin/products/new" className="inline-block px-8 py-3 bg-white text-black font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors">
              Add First Jersey
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: any }) {
  return (
    <div className="group flex flex-col">
      <Link href={`/product/${product.id}`} className="relative block aspect-[3/4] bg-zinc-900 overflow-hidden mb-4">
        {product.new_drop && (
          <div className="absolute top-4 left-4 z-10 bg-white text-black text-[10px] font-bold px-2 py-1 tracking-[0.2em]">
            NEW
          </div>
        )}
        {product.sold_out && (
          <div className="absolute inset-0 bg-black/60 z-20 flex items-center justify-center backdrop-blur-[2px]">
            <span className="border-2 border-white text-white font-bebas text-2xl px-6 py-2 tracking-widest rotate-[-15deg]">SOLD OUT</span>
          </div>
        )}
        <img
          src={product.image_url || 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=600&auto=format&fit=crop'}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-700 ${!product.sold_out ? 'group-hover:scale-110' : ''}`}
        />
        {!product.sold_out && (
          <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/80 to-transparent">
            <span
              className="block w-full bg-white text-black font-bold uppercase tracking-widest py-3 text-sm hover:bg-zinc-200 transition-colors text-center"
            >
              View Details
            </span>
          </div>
        )}
      </Link>
      <div>
        <h3 className="font-medium text-zinc-200 text-sm leading-snug mb-1">{product.name}</h3>
        <p className="text-zinc-400 text-sm">₹{product.price}</p>
      </div>
    </div>
  );
}
