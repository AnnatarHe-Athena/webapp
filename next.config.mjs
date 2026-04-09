/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    viewTransition: true,
  },
  serverExternalPackages: ['postgres', 'ioredis'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.annatarhe.com' },
      { protocol: 'https', hostname: '**.annatarhe.cn' },
    ],
  },
}

export default nextConfig
