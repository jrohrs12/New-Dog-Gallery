/** @type {import('next').NextConfig} */
const nextConfig = {};

(module.exports = nextConfig),
  {
    reactStrictMode: true,

    env: {
      BASE_URL: process.env.BASE_URL,
    },
  };
