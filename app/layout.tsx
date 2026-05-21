import type { Metadata } from "next";
import { Inter, Bebas_Neue, Barlow_Condensed } from "next/font/google";
import ConditionalShell from "@/components/ConditionalShell";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KAIZO STORE | Premium Football Jerseys & Kits",
  description:
    "Official premium football jerseys, retros, player editions and national kits. High-energy culture, maximum quality, and secure Cash on Delivery.",
  keywords: "football jerseys, retro jerseys, player version kits, authentic football store, buy jersey india",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable} ${barlowCondensed.variable}`}>
      <body className="min-h-screen flex flex-col bg-dark-bg text-zinc-100 font-sans antialiased selection:bg-accent selection:text-black bg-grain">
        <ConditionalShell>{children}</ConditionalShell>
      </body>
    </html>
  );
}
