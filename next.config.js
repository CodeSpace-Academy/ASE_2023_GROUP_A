/** @type {import('next').NextConfig} */

const { components } = require("react-select");

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
      "componets/categories/categories.jsx",
      "components/Ingredients/Ingredients.jsx",
      "components/Instructions/Instructions.jsx",
      "components/searchBar/searchBar.jsx",
      "components/sort/sort.jsx",
      "components/Tags/Tags.jsx",
      "components/Landing/Hero.jsx",
      "components/RecipeList/RecipeList.js",
      "components/Badges/Badges.jsx",
      "helpers/mongoDB-utils.js",
      "pages/api/combined",
      "pages/api/search/similarRecipes",
      "/pages/FavoritesPage.jsx",
      "/pages/index.jsx",
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
