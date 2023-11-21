/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    mongodb_password: process.env.mongodb_password,
    mongodb_username: process.env.mongodb_username,
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
  webpack: (config, { dev }) => {
    if (dev) {
      config.resolve.alias["react-dom$"] = "react-dom/profiling";
      config.resolve.alias["scheduler/tracing"] = "scheduler/tracing-profiling";
    }
    return config;
  },
};
