"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, ShieldCheck, Truck, Sparkles, MessageCircle } from "lucide-react";

export default function ProductDetailClient({ product, id }: { product: any; id: string }) {
  const sizes: string[] = product.sizes || ["S", "M", "L", "XL", "XXL"];
  const images: string[] = product.images?.length
    ? product.images
    : [product.image_url].filter(Boolean);
  const details: string[] = product.details || [
    "Official player-edition / match-spec standards",
    "Premium ultra-breathable sweat-wicking knit fabric",
    "Heat-applied high-definition branding and club crests",
    "Slim athletic fit matching professional pitch standards",
    "Washing instructions: Machine wash cold inside out",
  ];

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="min-h-screen bg-dark-bg py-12 pb-24 px-4 bg-grain">
      <div className="max-w-7xl mx-auto">
        {/* Back navigation */}
        <Link
          href="/shop"
          className="group inline-flex items-center text-zinc-400 hover:text-accent text-xs font-black uppercase tracking-[0.25em] font-barlow transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Catalog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* ── Image Gallery (Left Column) ── */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative aspect-[3/4] bg-dark-surface overflow-hidden border border-dark-border">
              {product.sold_out && (
                <div className="absolute inset-0 bg-black/80 z-20 flex items-center justify-center backdrop-blur-[2px]">
                  <span className="border-2 border-accent text-accent font-bebas text-4xl px-8 py-3 tracking-widest rotate-[-12deg]">
                    OUT OF STOCK
                  </span>
                </div>
              )}
              <img
                src={
                  images[activeImage] ||
                  "https://images.unsplash.com/photo-1587329310686-91414b8e3cb7?q=80&w=1000&auto=format&fit=crop"
                }
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative aspect-[3/4] bg-dark-surface overflow-hidden border-2 transition-all duration-300 ${
                      activeImage === idx
                        ? "border-accent opacity-100"
                        : "border-dark-border opacity-50 hover:opacity-90"
                    }`}
                  >
                    <img src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Product Info (Right Column) ── */}
          <div className="lg:col-span-5 flex flex-col pt-2">
            <div className="inline-flex items-center gap-1.5 mb-3 self-start">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span className="text-accent font-barlow text-[10px] font-black tracking-widest uppercase">
                {product.category} COLLECTION
              </span>
            </div>

            <h1 className="font-bebas text-5xl md:text-6xl tracking-wider text-white leading-none mb-4 uppercase">
              {product.name}
            </h1>
            
            <p className="font-barlow text-3xl font-black text-white mb-8">
              ₹{product.price?.toLocaleString("en-IN")}
            </p>

            {/* Size selector */}
            {!product.sold_out && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.2em] font-barlow">Select Size</h3>
                  <button className="text-[10px] font-black text-accent underline underline-offset-4 hover:text-white transition-colors uppercase tracking-widest font-barlow">
                    Measurements Table
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2.5">
                  {sizes.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-14 h-14 border-2 font-barlow font-black text-sm tracking-widest transition-all duration-300 ${
                        selectedSize === size
                          ? "border-accent bg-accent text-black shadow-[0_0_20px_rgba(189,0,255,0.35)]"
                          : "border-dark-border text-zinc-300 bg-dark-surface hover:border-zinc-500"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                
                {!selectedSize && (
                  <p className="text-zinc-500 text-[10px] font-bold font-barlow tracking-wider mt-3.5 uppercase">
                    * Choose a fit size to unlock WhatsApp checkout
                  </p>
                )}
              </div>
            )}

            {/* Action CTAs */}
            <div className="mb-10 space-y-3">
              {product.sold_out ? (
                <button
                  disabled
                  className="w-full py-5 bg-dark-surface border border-dark-border text-zinc-600 font-barlow font-black uppercase tracking-[0.2em] cursor-not-allowed text-xs"
                >
                  OUT OF STOCK
                </button>
              ) : (
                <>
                  <Link
                    href={
                      selectedSize
                        ? `/checkout?product=${id}&size=${selectedSize}`
                        : "#"
                    }
                    onClick={(e) => {
                      if (!selectedSize) {
                        e.preventDefault();
                        alert("Please choose your size option before proceeding.");
                      }
                    }}
                    className="block w-full py-5 bg-accent text-black font-barlow font-black uppercase tracking-[0.2em] text-center hover:bg-white transition-all duration-300 text-xs shadow-[0_0_25px_rgba(189,0,255,0.25)] hover:shadow-[0_0_30px_rgba(189,0,255,0.45)]"
                  >
                    PROCEED TO CHECKOUT — ₹{product.price?.toLocaleString("en-IN")}
                  </Link>

                  <a
                    href={`https://wa.me/919442282342?text=Hi,%20I%20am%20interested%20in%20ordering%20the%20${encodeURIComponent(product.name)}%20in%20size%20${selectedSize || 'M'}.%20Is%20it%20available?`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-4 border border-dark-border hover:border-accent bg-dark-surface/60 text-zinc-300 hover:text-white font-barlow font-black uppercase tracking-[0.2em] transition-all duration-300 text-[11px]"
                  >
                    <MessageCircle className="w-4 h-4 text-green-500" />
                    ORDER DIRECT VIA WHATSAPP
                  </a>
                </>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div className="border-b border-dark-border pb-8 mb-8">
                <h3 className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.2em] font-barlow mb-3">Overview</h3>
                <p className="text-zinc-400 text-sm leading-relaxed font-sans">
                  {product.description}
                </p>
              </div>
            )}

            {/* Specifications */}
            <div className="mb-8">
              <h3 className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.2em] font-barlow mb-4">
                Equipment Details
              </h3>
              <ul className="space-y-3 font-barlow font-bold text-xs tracking-wider">
                {details.map((detail: string, idx: number) => (
                  <li key={idx} className="flex items-start text-zinc-400 gap-3">
                    <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust highlights */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-dark-surface border border-dark-border">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-[10px] font-black font-barlow tracking-wider text-zinc-400 uppercase">Pan-India Transit</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-[10px] font-black font-barlow tracking-wider text-zinc-400 uppercase">Verified Standards</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
