/** @type {import('next').NextConfig} */
const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports = {
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
  sentry: {
    hideSourceMaps: true,
  },
};

const sentryWebpackPluginOptions = {
  silent: true,
};

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
