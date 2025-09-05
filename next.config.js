/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add other configurations you might have here...

  experimental: {
    // This line allows requests from the specified origin.
    allowedDevOrigins: ["http://10.241.117.53:3000"],
  },
};

module.exports = nextConfig;