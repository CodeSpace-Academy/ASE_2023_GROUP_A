/** @type {import('next').NextConfig} */

require("react-select");

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
      "components/Allergens/Allergens.jsx",
      "components/Badges/Badges.jsx",

      // Buttons
      "components/Buttons/FloatingButton/FloatingButton.jsx",
      "components/ViewRecipeButton/ViewRecipeButton.jsx",

      // Cards
      "components/Cards/FaveCard.jsx",
      "components/Cards/LoadingCard.jsx",
      "components/Cards/RecipeCard.jsx",
      "components/Cards/Title.jsx",

      // Categories
      "components/Categories/CategoriesMenu.jsx",

      // Context
      "components/Context/CurrentPageContexts/CurrentHomePage.jsx",
      "components/Context/Favorites-context.jsx",

      // Descriptions
      
      // Footer

      // Ingredients
      "components/Ingredients/Ingredients.jsx",
      "components/Ingredients/IngredientsList.jsx",

      // Instructions
      "components/Instructions/Instructions.jsx",

      // Landing
      "components/Landing/Hero.jsx",

      // LayOuts
      "components/LayOuts/Header/Navigation.jsx",

      // SearchBar
      "components/searchBar/searchBar.jsx",

      // Sort
      "components/sort/sort.jsx",
      // Tags
      "components/Tags/Tags.jsx",

      // Helpers
      "helpers/mongoDB-utils.js",
      // API's
      "pages/api/combined",
      "pages/api/search/similarRecipes",
      // Pages
      "pages/favorites",
      "pages/index.jsx",

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
