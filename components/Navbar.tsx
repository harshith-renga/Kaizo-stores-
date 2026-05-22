"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X, Flame } from "lucide-react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/shop", label: "SHOP ALL" },
  { href: "/drops", label: "NEW DROPS" },
  { href: "/collections/retro", label: "RETRO KITS" },
  { href: "/collections/national", label: "NATIONAL" },
  { href: "/collections/club", label: "CLUBS" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 flex flex-col">
        {/* Ticker / Announcement Bar */}
        <div className="w-full bg-dark-surface text-zinc-300 py-2 px-4 overflow-hidden select-none text-[9px] sm:text-[10px] font-black tracking-[0.3em] flex items-center border-b border-dark-border">
            <div className="whitespace-nowrap animate-marquee flex gap-8">
            <span className="flex items-center gap-1.5"><Flame className="w-3.5 h-3.5" /> FREE SHIPPING PAN-INDIA</span>
            <span>•</span>
            <span>100% PREMIUM AUTENTIC FABRIC & BADGES</span>
            <span>•</span>
            <span>CASH ON DELIVERY (COD) AVAILABLE</span>
            <span>•</span>
            <span className="flex items-center gap-1.5"><Flame className="w-3.5 h-3.5" /> FREE SHIPPING PAN-INDIA</span>
            <span>•</span>
            <span>100% PREMIUM AUTENTIC FABRIC & BADGES</span>
            <span>•</span>
            <span>CASH ON DELIVERY (COD) AVAILABLE</span>
            <span>•</span>
          </div>
        </div>

        {/* Navigation Bar */}
        <nav
          className={`w-full transition-all duration-300 ${
            isScrolled
              ? "bg-dark-bg/95 backdrop-blur-md border-b border-dark-border py-3 shadow-lg"
              : "bg-transparent border-b border-white/5 py-5"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="font-bebas text-2xl md:text-3.5xl tracking-widest text-white group flex items-center gap-1">
              KAIZO<span className="text-accent transition-colors duration-300 group-hover:text-white">STORE</span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8 font-barlow text-xs font-black tracking-[0.25em]">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/shop" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative py-1 transition-all duration-300 group ${
                      isActive ? "text-accent" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-0 w-full h-[2px] bg-accent transition-transform duration-300 origin-left ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Actions / Right Side Icons */}
            <div className="flex items-center space-x-5">
              <Link
                href="/shop"
                className="relative p-2 text-zinc-400 hover:text-accent transition-colors duration-300"
                aria-label="View store catalog"
              >
                <ShoppingBag className="w-5.5 h-5.5" />
              </Link>

              <Link
                href="/shop"
                className="hidden lg:inline-flex items-center justify-center bg-white/5 text-zinc-200 font-barlow text-[11px] font-black uppercase tracking-widest px-6 py-2.5 hover:bg-dark-surface-hover hover:text-white transition-all duration-300"
              >
                SHOP KIT
              </Link>

              <button
                className="md:hidden text-zinc-300 hover:text-accent transition-colors p-1"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-dark-bg z-40 flex flex-col items-center justify-center space-y-8 transition-all duration-500 md:hidden bg-grain ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
      >
        {/* Background Decorative Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bebas text-[18vw] leading-none text-white/[0.02] tracking-widest select-none pointer-events-none">
          KAIZO STORE
        </div>

        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-bebas text-5xl tracking-widest text-white hover:text-accent transition-colors duration-300 relative group"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        
              <Link
                href="/shop"
                className="mt-6 px-12 py-4 bg-accent text-black font-barlow font-black uppercase tracking-widest text-sm hover:bg-dark-surface-hover hover:text-white transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ENTER CATALOG
              </Link>
      </div>
      
      {/* Spacer to prevent content overlap under fixed header */}
      <div className="h-[96px] sm:h-[102px]"></div>
    </>
  );
}
