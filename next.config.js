/** @type {import('next').NextConfig} */
const path = require('path')
const isProduction = process.env.NODE_ENV === 'production';

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: !isProduction
})

const nextConfig = withPWA({
  eslint: {
    ignoreDuringBuilds: true
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['raw.githubusercontent.com', 'images.pokemontcg.io']
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  }
});

module.exports = nextConfig;
