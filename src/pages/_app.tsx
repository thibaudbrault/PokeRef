import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';

import { ThemeProvider } from '@/contexts';
import '@/styles/styles.scss';
import { useNextCssRemovalPrevention } from '@/hooks';
import { PageLayout } from '@/layouts';

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

  useNextCssRemovalPrevention();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <ThemeProvider>
              <Toaster />
              <NextNProgress />
              <PageLayout>
                <Component {...pageProps} />
              </PageLayout>
            </ThemeProvider>
          </Hydrate>
        </QueryClientProvider>
      </ErrorBoundary>
    </>
  );
}

export default MyApp;
