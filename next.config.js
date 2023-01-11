/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'portfolio-images-ajayganesh.s3.us-east-2.amazonaws.com',
      },
    ],
  },
  reactStrictMode: true,

}

module.exports = nextConfig
