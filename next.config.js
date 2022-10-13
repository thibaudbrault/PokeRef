/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
};

const withPWA = require('next-pwa')({
	dest: 'public'
})

module.exports = withPWA({
	images: {
		domains: ['raw.githubusercontent.com'],
	},
	experimental: {
		images: {
			allowFutureImage: true,
		},
	},
});
