import fs from 'fs'

// photo album: every image in public/album, sorted by filename (see lib/album.ts)
const albumPhotos = fs
  .readdirSync(new URL('./public/album', import.meta.url))
  .filter((f) => /\.(jpe?g|png|webp|avif|gif)$/i.test(f))
  .sort((a, b) => a.localeCompare(b))

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ALBUM_PHOTOS: JSON.stringify(albumPhotos),
  },
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

export default nextConfig
