/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
};

module.exports = {
	images: {
		domains: ['raw.githubusercontent.com'],
	},
	experimental: {
		images: {
			allowFutureImage: true,
		},
	},
};
