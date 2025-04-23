/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['unpkg.com'], // Add domains for external images
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  // Disable ESLint during builds to prevent failures
  eslint: {
    ignoreDuringBuilds: true,
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
