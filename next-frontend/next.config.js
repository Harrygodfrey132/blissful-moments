const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000, // Check for file changes every second
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
