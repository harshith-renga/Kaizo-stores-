import Link from "next/link";
import { Camera, MessageCircle } from "lucide-react";

const WHATSAPP = "919442282342";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2 flex flex-col space-y-4">
            <Link href="/" className="font-bebas text-4xl tracking-widest text-white">
              KAIZO<span className="text-zinc-600">STORE</span>
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
              Premium football jerseys for real fans. Authentic quality, iconic designs, and a passion for the beautiful game.
            </p>
            <div className="flex space-x-3 pt-2">
              <a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white text-xs font-bold uppercase tracking-widest transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Order
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors"
              >
                <Camera className="w-4 h-4" />
                Instagram
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div className="flex flex-col space-y-4">
            <h4 className="font-bebas text-xl text-white tracking-widest">Shop</h4>
            <div className="flex flex-col space-y-3">
              <Link href="/shop" className="text-zinc-500 text-sm hover:text-white transition-colors">All Jerseys</Link>
              <Link href="/drops" className="text-zinc-500 text-sm hover:text-white transition-colors">New Drops</Link>
              <Link href="/collections/retro" className="text-zinc-500 text-sm hover:text-white transition-colors">Retro Classics</Link>
              <Link href="/collections/national" className="text-zinc-500 text-sm hover:text-white transition-colors">National Teams</Link>
              <Link href="/collections/club" className="text-zinc-500 text-sm hover:text-white transition-colors">Club Jerseys</Link>
              <Link href="/collections/player" className="text-zinc-500 text-sm hover:text-white transition-colors">Player Editions</Link>
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col space-y-4">
            <h4 className="font-bebas text-xl text-white tracking-widest">Info</h4>
            <div className="flex flex-col space-y-3">
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="text-zinc-500 text-sm hover:text-white transition-colors">Contact Us</a>
              <Link href="/shop" className="text-zinc-500 text-sm hover:text-white transition-colors">Sizing Guide</Link>
              <Link href="/shop" className="text-zinc-500 text-sm hover:text-white transition-colors">Shipping Policy</Link>
              <Link href="/shop" className="text-zinc-500 text-sm hover:text-white transition-colors">Returns</Link>
              <Link href="/admin" className="text-zinc-700 text-xs hover:text-zinc-500 transition-colors mt-4">Admin Panel</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-700 text-xs">
            &copy; {new Date().getFullYear()} KAIZO STORE. All rights reserved.
          </p>
          <p className="text-zinc-700 text-xs">
            UPI: harshithmanu13-3@okhdfcbank
          </p>
        </div>
      </div>
    </footer>
  );
}
