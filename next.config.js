/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [], // Add domains for external images if needed
    formats: ['image/avif', 'image/webp'],
  },
  // Disable ESLint during builds to prevent failures
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
