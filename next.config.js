/** @type {import('next').NextConfig} */

module.exports = {
  env: {
    mongodb_password: process.env.mongodb_password,
    mongodb_username: process.env.mongodb_username,
  },
  images: {
    domains: ["img.sndimg.com"],
  },
  reactStrictMode: true,
  eslint: {
    dirs: ["/pages/RecipeList", "/pages/api/combined"],
  },
};
