/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com',
      'localhost',
      '0.0.0.0'
    ],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**',
      }
    ],
  },
  // Desabilitar explicitamente o Turbopack
  experimental: {
    turbo: false
  }
};

module.exports = nextConfig;