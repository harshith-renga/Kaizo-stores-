import Link from "next/link";
import { Camera, MessageCircle, ArrowUpRight, Heart } from "lucide-react";

const WHATSAPP = "919442282342";

export default function Footer() {
  return (
    <footer className="bg-dark-surface border-t border-dark-border pt-20 pb-10 bg-grain relative overflow-hidden">
      {/* Decorative large backdrop text */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 font-bebas text-[14vw] text-white/[0.01] tracking-widest leading-none pointer-events-none select-none whitespace-nowrap">
        KAIZO FOOTBALL CLUB
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col space-y-6">
            <Link href="/" className="font-bebas text-4xl sm:text-5xl tracking-wider text-white">
              KAIZO<span className="text-accent">STORE</span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm font-sans">
              Curating premium quality football culture. Authentically constructed jerseys, retro kit gems, and match-spec player editions for true supporters of the beautiful game.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 bg-accent hover:bg-white text-black text-xs font-black uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(200,255,0,0.1)] hover:shadow-[0_0_25px_rgba(200,255,0,0.25)]"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Order
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-5 py-3 border border-dark-border hover:border-accent text-zinc-400 hover:text-white text-xs font-black uppercase tracking-widest transition-all duration-300"
              >
                <Camera className="w-4 h-4 text-zinc-500" />
                Instagram <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
              </a>
            </div>
          </div>

          {/* Links Grid */}
          <div className="md:col-span-3 flex flex-col space-y-4">
            <h4 className="font-barlow text-sm font-black text-white tracking-[0.2em] uppercase border-l-2 border-accent pl-3">Catalog</h4>
            <div className="flex flex-col space-y-3 font-barlow font-bold text-xs tracking-wider">
              {[
                { href: "/shop", label: "All Jerseys" },
                { href: "/drops", label: "New Drops" },
                { href: "/collections/retro", label: "Retro Classics" },
                { href: "/collections/national", label: "National Kits" },
                { href: "/collections/club", label: "Club Jerseys" },
                { href: "/collections/player", label: "Player Editions" }
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-zinc-400 hover:text-accent transition-colors duration-200 flex items-center gap-1 group"
                >
                  {link.label}
                  <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
                </Link>
              ))}
            </div>
          </div>

          {/* Support / Info */}
          <div className="md:col-span-4 flex flex-col space-y-4">
            <h4 className="font-barlow text-sm font-black text-white tracking-[0.2em] uppercase border-l-2 border-accent pl-3">Customer Desk</h4>
            <div className="flex flex-col space-y-3 font-barlow font-bold text-xs tracking-wider">
              <a 
                href={`https://wa.me/${WHATSAPP}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-zinc-400 hover:text-accent transition-colors duration-200"
              >
                Direct Support Chat (24/7)
              </a>
              <Link href="/shop" className="text-zinc-400 hover:text-accent transition-colors duration-200">Sizing & Measurements Guide</Link>
              <Link href="/shop" className="text-zinc-400 hover:text-accent transition-colors duration-200">Shipping Policy & ETA</Link>
              <Link href="/shop" className="text-zinc-400 hover:text-accent transition-colors duration-200">Return & Replacement Policy</Link>
              <Link 
                href="/admin" 
                prefetch={false} 
                className="text-zinc-600 hover:text-zinc-400 transition-colors mt-4 text-[10px] uppercase tracking-[0.2em]"
              >
                Manage / Admin Panel
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Bottom Strip */}
        <div className="border-t border-dark-border pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-zinc-500 text-xs font-barlow font-bold tracking-wider">
            &copy; {new Date().getFullYear()} KAIZO STORE. Crafted with passion.
          </p>
          
          <div className="flex items-center gap-1.5 text-zinc-500 text-xs font-barlow font-bold tracking-wider">
            <span>UPI SECURE PAY:</span>
            <span className="text-zinc-300 font-mono">harshithmanu13-3@okhdfcbank</span>
          </div>

          <p className="text-zinc-500 text-xs font-barlow font-bold tracking-wider flex items-center gap-1">
            Made for the game <Heart className="w-3.5 h-3.5 text-accent animate-pulse" />
          </p>
        </div>
      </div>
    </footer>
  );
}
