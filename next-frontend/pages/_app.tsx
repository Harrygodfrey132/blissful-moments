import '../styles/globals.css';
import Layout from '../components/Layout';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { useEffect } from 'react';
import 'aos/dist/aos.css'; // Import AOS CSS
import Aos from 'aos'; // Import AOS library

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps & { Component: { noLayout?: boolean } }) {
  useEffect(() => {
    Aos.init({ duration: 1000 }); // Initialize AOS with custom settings (e.g., duration of 1000ms)
  }, []);
  

  return (
    <>

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
}

export default MyApp;
