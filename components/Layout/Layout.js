import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

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

function Layout({ children }) {

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
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
				<Header themeToggler={themeToggler} theme={theme} />
				<Nav />
				<>
					<Reset />
					{children}
				</>
				<Footer />
			</ThemeProvider>
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}

export default Layout;