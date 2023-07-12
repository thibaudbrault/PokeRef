import { useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';

import { ThemeProvider } from '@/contexts';
import { Footer, Header, Nav } from '@/modules/layout';
import '@/styles/styles.scss';
import { SessionProvider } from 'next-auth/react';

import type { AppProps } from 'next/app';

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
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
        <SessionProvider session={session}>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider>
              <Toaster />
              <NextNProgress />
              <Header navOpen={navOpen} setNavOpen={setNavOpen} />
              <Nav navOpen={navOpen} setNavOpen={setNavOpen} />
              <Component {...pageProps} />
              <Footer />
            </ThemeProvider>
          </QueryClientProvider>
        </SessionProvider>
      </ErrorBoundary>
    </>
  );
}

export default MyApp;
