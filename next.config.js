/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Disable SWC completely to avoid native addon issues
  swcMinify: false,
  experimental: {
    forceSwcTransforms: false,
    esmExternals: false,
    // Enable webpack builder worker for custom webpack configuration
    webpackBuildWorker: true,
  },
  // Use Babel instead of SWC
  compiler: {
    removeConsole: false,
  },
  // Webpack configuration to handle the build
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Fallback for when SWC fails
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    }
    
    return config
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