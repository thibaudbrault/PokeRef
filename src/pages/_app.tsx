import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useState } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import PlausibleProvider from 'next-plausible';
import NextNProgress from 'nextjs-progressbar';
import { Toaster } from 'react-hot-toast';

import { ThemeProvider } from '@/contexts';
import '@/styles/styles.scss';
import { Footer, Header, Nav } from '@/modules/layout';

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
