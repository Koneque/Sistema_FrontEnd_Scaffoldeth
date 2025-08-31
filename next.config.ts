import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Base Mini App Configuration */
  experimental: {
    optimizePackageImports: ['@coinbase/onchainkit'],
  },
  turbopack: {
    loaders: {
      // Configure TypeScript loader for better performance
      '.ts': ['ts-loader'],
      '.tsx': ['ts-loader'],
      // Configure CSS modules
      '.module.css': ['css-loader'],
      // Configure SCSS if needed
      '.scss': ['sass-loader'],
      '.module.scss': ['sass-loader'],
    },
    resolveAlias: {
      // Optimize common imports
      '@': './src',
      '@components': './components',
      '@lib': './lib',
      '@app': './app',
    },
    resolveExtensions: [
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
      '.json',
      '.css',
      '.scss',
    ],
    rules: [
      {
        source: {
          include: ['**/*.{js,jsx,ts,tsx}'],
        },
        loaders: ['swc-loader'],
      },
    ],
  },
  images: {
    domains: ['wallet-api-production.s3.amazonaws.com', 'mintlify-assets.b-cdn.net'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_CHAIN_ID: process.env.NEXT_PUBLIC_CHAIN_ID,
    NEXT_PUBLIC_BASE_RPC_URL: process.env.NEXT_PUBLIC_BASE_RPC_URL,
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
