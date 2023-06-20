import { darkTheme, lightTheme } from '@/components/common/styles/Themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useState } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

// import { Reset } from '@/components/common/styles/Reset';
import Footer from '@/components/layout/Footer/Footer';
import Header from '@/components/layout/Header/Header';
import Nav from '@/components/layout/Nav/Nav';
import NextNProgress from 'nextjs-progressbar';
import { Toaster } from 'react-hot-toast';
import PlausibleProvider from 'next-plausible';

import '@/styles/styles.scss';
import { ThemeProvider } from '@/contexts/Theme';

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: Infinity,
        staleTime: Infinity,
        retry: false,
      },
    },
  });

  const [navOpen, setNavOpen] = useState(false);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <PlausibleProvider
              domain="pokeref.app"
              enabled={process.env.NODE_ENV === `production`}
            >
              <Toaster />
              <NextNProgress />
              <Header navOpen={navOpen} setNavOpen={setNavOpen} />
              <Nav navOpen={navOpen} setNavOpen={setNavOpen} />
              {/* <Reset /> */}
              <Component {...pageProps} />
              <Footer />
            </PlausibleProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </>
  );
}

export default MyApp;
