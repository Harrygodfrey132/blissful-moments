import { Html, Head, Main, NextScript } from 'next/document';

const MyDocument = () => {
  return (
    <Html lang="en">
      <Head>
        {/* Meta tags, favicon, global stylesheets, etc. */}
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      </Head>
      <body className='bg-gray-50'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default MyDocument;
