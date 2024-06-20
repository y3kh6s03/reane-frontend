import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'next-auth.js.org',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      }
    ],
  },
  webpack(config) {
    config.resolve.alias['@'] = path.resolve(process.cwd(), 'src/app');
    return config;
  },
};

export default nextConfig;
