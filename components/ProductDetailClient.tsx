"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, ShieldCheck, Truck } from "lucide-react";

export default function ProductDetailClient({ product, id }: { product: any; id: string }) {
  const sizes: string[] = product.sizes || ["S", "M", "L", "XL", "XXL"];
  const images: string[] = product.images?.length
    ? product.images
    : [product.image_url].filter(Boolean);
  const details: string[] = product.details || [
    "Authentic player-version quality",
    "Premium lightweight fabric",
    "Embroidered badge & details",
    "Athletic slim fit",
    "Machine washable",
  ];

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="min-h-screen bg-zinc-950 py-8 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back */}
        <Link
          href="/shop"
          className="inline-flex items-center text-zinc-500 hover:text-white text-sm font-bold uppercase tracking-widest transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* ── Image Gallery ── */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-[3/4] bg-zinc-900 overflow-hidden rounded-sm">
              {product.sold_out && (
                <div className="absolute inset-0 bg-black/60 z-20 flex items-center justify-center">
                  <span className="border-2 border-white text-white font-bebas text-4xl px-8 py-3 tracking-widest rotate-[-12deg]">
                    SOLD OUT
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
              <div className="grid grid-cols-4 gap-2">
                {images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative aspect-square bg-zinc-900 overflow-hidden border-2 transition-all ${
                      activeImage === idx
                        ? "border-white"
                        : "border-transparent opacity-50 hover:opacity-80"
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Product Info ── */}
          <div className="flex flex-col pt-2 lg:pt-8">
            <p className="text-zinc-500 uppercase tracking-[0.3em] text-xs font-bold mb-3 capitalize">
              {product.category} Jersey
            </p>
            <h1 className="font-bebas text-5xl md:text-6xl tracking-wide text-white leading-none mb-4">
              {product.name}
            </h1>
            <p className="font-bebas text-4xl text-zinc-200 mb-8">
              ₹{product.price?.toLocaleString("en-IN")}
            </p>

            {/* Size selector */}
            {!product.sold_out && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-[0.2em]">Select Size</h3>
                  <button className="text-xs text-zinc-500 underline underline-offset-4 hover:text-white transition-colors">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-14 h-14 border-2 font-bold text-sm transition-all ${
                        selectedSize === size
                          ? "border-white bg-white text-black"
                          : "border-zinc-700 text-zinc-300 hover:border-zinc-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {!selectedSize && (
                  <p className="text-zinc-600 text-xs mt-3 uppercase tracking-widest">
                    Please select a size
                  </p>
                )}
              </div>
            )}

            {/* CTA */}
            <div className="mb-10">
              {product.sold_out ? (
                <button
                  disabled
                  className="w-full py-5 bg-zinc-800 text-zinc-500 font-bold uppercase tracking-[0.2em] cursor-not-allowed"
                >
                  Sold Out
                </button>
              ) : (
                <Link
                  href={
                    selectedSize
                      ? `/checkout?product=${id}&size=${selectedSize}`
                      : "#"
                  }
                  onClick={(e) => {
                    if (!selectedSize) {
                      e.preventDefault();
                      alert("Please select a size first.");
                    }
                  }}
                  className="block w-full py-5 bg-white text-black font-bold uppercase tracking-[0.2em] text-center hover:bg-zinc-200 transition-colors text-sm"
                >
                  Buy Now — ₹{product.price?.toLocaleString("en-IN")}
                </Link>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-zinc-400 text-sm leading-relaxed mb-8 border-b border-zinc-900 pb-8">
                {product.description}
              </p>
            )}

            {/* Details */}
            <div className="mb-8">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] mb-4">
                Product Details
              </h3>
              <ul className="space-y-2">
                {details.map((detail: string, idx: number) => (
                  <li key={idx} className="flex items-start text-zinc-400 text-sm gap-3">
                    <Check className="w-4 h-4 text-zinc-600 mt-0.5 flex-shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            {/* Shipping info */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-sm">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-zinc-500 flex-shrink-0" />
                <span className="text-xs text-zinc-400">Pan-India Delivery</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-zinc-500 flex-shrink-0" />
                <span className="text-xs text-zinc-400">Quality Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
