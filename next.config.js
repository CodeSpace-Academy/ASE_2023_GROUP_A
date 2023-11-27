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
      "components/Badges/Badges.jsx",
      "helpers/mongoDB-utils.js",
      "pages/api/combined",
      "pages/api/search/similarRecipes",
      "/pages/favorites",
      "/pages/index.jsx",
      "/components/Context/Favorites-context.jsx",
      "/components/Cards/RecipeCard.jsx",
      "/components/LayOuts/Header/Navigation.jsx",
      "components/Ingredients/IngredientsList.jsx",
      "components/Landing/Hero.jsx",
      "components/Buttons/FloatingButton/FloatingButton.jsx",
      "components/Context/CurrentPageContexts/CurrentHomePage.jsx",
      "components/Badges/Badges.jsx",
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
