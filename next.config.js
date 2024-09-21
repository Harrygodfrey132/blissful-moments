const withMDX = require("@next/mdx")();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  
  // Optionally, add any other Next.js config below
    env: {
      AUTH0_SECRET: process.env.AUTH0_SECRET,
      AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
      NEXT_PUBLIC_AUTH0_BASE_URL: process.env.NEXT_PUBLIC_AUTH0_BASE_URL,
      NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL: process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL,
      NEXT_PUBLIC_AUTH0_CLIENT_ID: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
      NEXT_PUBLIC_AUTH0_SCOPE: process.env.NEXT_PUBLIC_AUTH0_SCOPE,
    },
  
  // Additional configurations can be added here
};

module.exports = withMDX(nextConfig);

