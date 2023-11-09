/** @type {import('next').NextConfig} */

module.exports = {
  eslint: {
    dirs: ['/pages/FavoritesPage', '/components/Context/Favorites-context'],
    // ignoreDuringBuilds: true,
  },
  env: {
    mongodb_password: process.env.mongodb_password,
    mongodb_username: process.env.mongodb_username,
  },
  images: {
    domains: ['img.sndimg.com'],
  },
  reactStrictMode: true,
};
