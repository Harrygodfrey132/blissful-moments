import '../styles/globals.css';
import Layout from '../components/Layout';
import type { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps & { Component: { noLayout?: boolean } }) => {
  // If the page component has a `noLayout` property, render it without the `Layout`
  if (Component.noLayout) {
    return <Component {...pageProps} />;
  }

  // Otherwise, wrap it in the `Layout`
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
