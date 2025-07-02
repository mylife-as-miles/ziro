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
}

export default nextConfig