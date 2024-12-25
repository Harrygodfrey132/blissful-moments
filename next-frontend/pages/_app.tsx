import '../styles/globals.css';
import Layout from '../components/Layout';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { useEffect } from 'react';
import 'aos/dist/aos.css'; // Import AOS CSS
import Aos from 'aos'; // Import AOS library
import { ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toast styles
import { IsVerifiedProvider } from '../context/IsUserVerifiedContext';
import { PageProvider } from '../context/PageContext';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps & { Component: { noLayout?: boolean } }) {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <>

      <SessionProvider session={session}>
        <PageProvider>
          <IsVerifiedProvider>
            <ToastContainer />
            {/* Render without Layout if `noLayout` is set */}
            {Component.noLayout ? (
              <Component {...pageProps} />
            ) : (
              <Layout>
                <Component {...pageProps} />
              </Layout>
            )}
          </IsVerifiedProvider>
        </PageProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
