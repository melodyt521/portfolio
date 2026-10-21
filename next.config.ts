import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [{ source: '/work/the-shop', destination: '/work/instagram-redesign', permanent: true }];
  },
};
export default nextConfig;
