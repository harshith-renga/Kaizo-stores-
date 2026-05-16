import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'wxamotqorjaybixfiwar.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'assets.adidas.com',
      },
    ],
  },
  // Allow <img> tags with external sources without warnings
  experimental: {},
};

export default nextConfig;
