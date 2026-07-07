/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'portfolio-images-ajayganesh.s3.us-east-2.amazonaws.com',
      }, {
        protocol: 'https',
        hostname: 'i.scdn.co',
        port: "",
        pathname: "/image/*"
      }, {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
    ],
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/spotifystats',
        destination: '/spotify',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
