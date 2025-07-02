/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Modern Next.js has much better SWC stability
  swcMinify: true,
  experimental: {
    // Remove deprecated options that cause issues
    optimizePackageImports: ['lucide-react'],
  },
  async redirects() {
    return [
      {
        source: '/login',
        destination: '/landing',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig