import path from 'path';
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Menambahkan alias path
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': path.join(__dirname, 'components'),
    };
    return config;
  },
};

export default nextConfig;
