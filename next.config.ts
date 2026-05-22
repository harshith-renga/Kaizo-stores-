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
  // Allow dev origins (for accessing dev server over LAN during development)
  // Add your local IP / host if you're previewing the site from another device.
  allowedDevOrigins: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://192.168.1.9:3000',
    'http://192.168.1.9:3001',
  ],
  // Allow <img> tags with external sources without warnings
  experimental: {},
};

export default nextConfig;
