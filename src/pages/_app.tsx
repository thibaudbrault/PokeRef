import { darkTheme, lightTheme } from '@/components/common/styles/Themes';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useState } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from 'styled-components';

import { Reset } from '@/components/common/styles/Reset';
import Footer from '@/components/layout/Footer/Footer';
import Header from '@/components/layout/Header/Header';
import Nav from '@/components/layout/Nav/Nav';
import NextNProgress from 'nextjs-progressbar';
import { Toaster } from 'react-hot-toast';

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
