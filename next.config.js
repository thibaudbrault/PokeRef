/** @type {import('next').NextConfig} */
const nextConfig = {
	compiler: {
		styledComponents: true
	},
	reactStrictMode: true,
	experimental: {
		appDir: false,
	},
	swcMinify: true,
	images: {
		domains: ['raw.githubusercontent.com', "lh3.googleusercontent.com"]
	}
};


module.exports = nextConfig;
