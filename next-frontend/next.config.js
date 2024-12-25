/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // async redirects() {
  //   return [
  //     {
  //       source: '/my-page',
  //       destination: '/account/my-page',
  //       permanent: true, // Set to `true` for a 301 redirect (permanent)
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
