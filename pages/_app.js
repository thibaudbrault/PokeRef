import React, { useState } from 'react';
import Head from 'next/head';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';

import { darkTheme, lightTheme } from '/components/BaseStyles/Themes';

import Header from '/components/Layout/Header/Header';
import Nav from '/components/Layout/Nav/Nav';
import Footer from '/components/Layout/Footer/Footer';
import { Reset } from '/components/BaseStyles/Reset';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			cacheTime: Infinity,
		},
	},
});

function MyApp({ Component, pageProps }) {
	const loadTheme = () => {
		const localTheme = globalThis.window?.localStorage.getItem('theme');
		return localTheme ?? 'dark';
	};

	const [theme, setTheme] = useState(loadTheme());

	const setMode = (mode) => {
		globalThis.window?.localStorage.setItem('theme', mode);
		setTheme(mode);
	};

	const themeToggler = () => {
		theme === 'dark' ? setMode('light') : setMode('dark');
	};

	return (
		<>
			<Head>
				<meta name='viewport' content='width=device-width,initial-scale=1' />
			</Head>
			<QueryClientProvider client={queryClient}>
				<Hydrate state={pageProps.dehydratedState}>
					<ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
						<Header themeToggler={themeToggler} theme={theme} />
						<Nav />
						<Reset />
						<Component {...pageProps} />
						<Footer />
					</ThemeProvider>
				</Hydrate>
			</QueryClientProvider>
		</>
	);
}

export default MyApp;
