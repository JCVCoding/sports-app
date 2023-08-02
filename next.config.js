/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.bleacherreport.*',
      },
      {
        protocol: 'https',
        hostname: '*githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '*googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'a.espncdn.com',
      },
    ],
  },
};

module.exports = nextConfig;
