/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["replicate.delivery", "firebasestorage.googleapis.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
