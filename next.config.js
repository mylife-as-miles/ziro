/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Modern Next.js has excellent SWC stability
  swcMinify: true,
  experimental: {
    // Optimize package imports for better performance
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

export default nextConfig