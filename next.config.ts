import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Base Mini App Configuration */
  experimental: {
    optimizePackageImports: ['@coinbase/onchainkit'],
  },
  // Enable static exports for better Mini App performance
  output: 'standalone',
  
  // Image optimization for Mini Apps
  images: {
    domains: ['wallet-api-production.s3.amazonaws.com', 'mintlify-assets.b-cdn.net'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // Optimize for Mini Apps
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Environment variables for Mini Apps
  env: {
    NEXT_PUBLIC_CHAIN_ID: process.env.NEXT_PUBLIC_CHAIN_ID,
    NEXT_PUBLIC_BASE_RPC_URL: process.env.NEXT_PUBLIC_BASE_RPC_URL,
    NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
    NEXT_PUBLIC_ONCHAINKIT_API_KEY: process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY,
  },
  
  // Headers for Mini Apps security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  webpack: (config: any) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
};

export default nextConfig;
