import React, { useState } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';
import { ReactQueryDevtools } from 'react-query/devtools';
import { darkTheme, lightTheme } from '@/components/common/styles/Themes';

import Header from '@/components/layout/Header/Header';
import Nav from '@/components/layout/Nav/Nav';
import Footer from '@/components/layout/Footer/Footer';
import { Reset } from '@/components/common/styles/Reset';
import { Toaster } from 'react-hot-toast';
import NextNProgress from 'nextjs-progressbar';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
      staleTime: Infinity,
      retry: false,
    },
  },
});

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  <div role="alert">
    <p>Something went wrong:</p>
    <pre>{error.message}</pre>
    <button onClick={resetErrorBoundary}>Try again</button>
  </div>;
};

function MyApp({ Component, pageProps }: AppProps) {
  const [navOpen, setNavOpen] = useState(false);

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
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme === `dark` ? darkTheme : lightTheme}>
            <Toaster />
            <NextNProgress />
            <Header
              navOpen={navOpen}
              setNavOpen={setNavOpen}
              themeToggler={themeToggler}
              theme={theme}
            />
            <Nav navOpen={navOpen} setNavOpen={setNavOpen} />
            <Reset />
            <Component {...pageProps} />
            <Footer />
            <ReactQueryDevtools />
          </ThemeProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </>
  );
}

export default MyApp;
