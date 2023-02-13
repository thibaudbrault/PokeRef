/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === 'production';

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: !isProduction
})

const nextConfig = withPWA({
  compiler: {
    styledComponents: true
  },
  reactStrictMode: true,
  experimental: {
    appDir: false,
  },
  swcMinify: true,
  images: {
    domains: ['raw.githubusercontent.com', 'lh3.googleusercontent.com', 'play.pokemonshowdown.com']
  },
});

module.exports = nextConfig;
