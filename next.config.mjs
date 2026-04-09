/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    viewTransition: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.annatarhe.com' },
      { protocol: 'https', hostname: '**.annatarhe.cn' },
    ],
  },
}

export default nextConfig
