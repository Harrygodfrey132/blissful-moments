const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "admin.blissful-moments.app.local",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "admin.theblissfulmoments.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "blissful-moments.app.local",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "blissfull.test",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
