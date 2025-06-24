import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com'], // ✅ allow external image host
  },
}

export default nextConfig
