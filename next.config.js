/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
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