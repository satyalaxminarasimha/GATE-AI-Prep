import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Example 1: Add environment variables
  env: {
GEMINI_API_KEY : AIzaSyAnRwkRwKgWqv2iSTByYEp9UD3XqI8e-iE,
MONGODB_URI : mongodb+srv://capl:capl%40123@gateaiprep.iiegdiv.mongodb.net/?retryWrites=true&w=majority&appName=GATEAIPrep
  },

  // Example 2: Configure external image domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.example.com',
        pathname: '/images/**',
      },
    ],
  },

  // Example 3: Create redirects
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/about-us',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
