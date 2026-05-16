import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
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

export const metadata: Metadata = {
  title: "KAIZO STORE | Premium Football Jerseys",
  description:
    "Premium football jerseys for real fans. Authentic kits from top clubs and national teams. Shop now with Cash on Delivery.",
  keywords: "football jerseys, premium jerseys, authentic football kits, buy jersey India",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable}`}>
      <body className="min-h-screen flex flex-col bg-zinc-950 text-zinc-50 font-sans antialiased selection:bg-zinc-800 selection:text-white">
        <ConditionalShell>{children}</ConditionalShell>
      </body>
    </html>
  );
}
