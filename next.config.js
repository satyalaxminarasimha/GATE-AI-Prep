/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add other configurations you might have here...
   eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },

  
};

module.exports = nextConfig;