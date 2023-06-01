/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.bleacherreport.net',
      },
    ],
  },
};

module.exports = nextConfig;
