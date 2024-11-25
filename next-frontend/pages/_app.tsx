import '../styles/globals.css';
import Layout from '../components/Layout';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'sonner';

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps & { Component: { noLayout?: boolean } }) => {
  return (
    <>
      {/* Global Toaster for notifications */}
      <Toaster position="top-right" richColors closeButton />

      <SessionProvider session={session}>
        {/* Render without Layout if `noLayout` is set */}
        {Component.noLayout ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </SessionProvider>
    </>
  );
};

export default MyApp;
