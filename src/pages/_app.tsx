import React, { useState } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';
// import { SessionProvider } from 'next-auth/react';

import { darkTheme, lightTheme } from '../components/Common/Themes';

import Header from '../components/Layout/Header/Header';
import Nav from '../components/Layout/Nav/Nav';
import Footer from '../components/Layout/Footer/Footer';
import { Reset } from '../components/Common/Reset';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
      staleTime: Infinity,
      retry: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const loadTheme: () => string = () => {
    const localTheme = globalThis.window?.localStorage.getItem(`theme`);
    return localTheme ?? `dark`;
  };

  const [theme, setTheme] = useState(loadTheme());

  const setMode = (mode: string) => {
    globalThis.window?.localStorage.setItem(`theme`, mode);
    setTheme(mode);
  };

  const themeToggler = () => {
    theme === `dark` ? setMode(`light`) : setMode(`dark`);
  };
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      {/* <SessionProvider> */}
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme === `dark` ? darkTheme : lightTheme}>
          <Header themeToggler={themeToggler} theme={theme} />
          <Nav />
          <Reset />
          <Component {...pageProps} />
          <Footer />
        </ThemeProvider>
      </QueryClientProvider>
      {/* </SessionProvider> */}
    </>
  );
}

export default MyApp;
