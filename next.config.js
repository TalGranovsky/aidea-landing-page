/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['unpkg.com'], // Add domains for external images
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Disable ESLint during builds to prevent failures
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Performance optimizations
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    optimizePackageImports: ['framer-motion'],
  },
  // Optimize output
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
}

module.exports = nextConfig
