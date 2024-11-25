import Head from 'next/head';

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Welcome to the homepage of MyWebsite" />
      </Head>
      <div className='mt-[100px]'>
        <h1>Welcome to MyWebsite!</h1>
        <p>This is the home page content.</p>
      </div>
    </>
  );
};

export default HomePage;
