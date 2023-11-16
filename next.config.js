/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    mongodb_uri: process.env.mongodb_uri,
  },
  images: {
    domains: ["img.sndimg.com"],
  },
  reactStrictMode: true,
  eslint: {
    dirs: [
      "/pages/FavoritesPage.jsx",
      "/components/Context/Favorites-context.js",
      "/components/Cards/RecipeCard.jsx",
      "/components/LayOuts/Header/Navigation.jsx",
    ],
  },
};
