/** @type {import('next').NextConfig} */

module.exports = {
  eslint: {
    dirs: ["components", "pages/FavoritesPage"],
  },
  env: {
    mongodb_password: process.env.mongodb_password,
    mongodb_username: process.env.mongodb_username,
  },
  
  images: {
    domains: ["img.sndimg.com"],
  },
  reactStrictMode: true,
};
