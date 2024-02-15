/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@recordex/smartcontract'],
  // 参考: https://github.com/wojtekmaj/react-pdf?tab=readme-ov-file#nextjs
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
};

module.exports = nextConfig;
