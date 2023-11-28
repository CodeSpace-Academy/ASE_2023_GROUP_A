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
      "components/ingredients/ingredients.jsx",
      "components/instructions/instructions.jsx",
      "components/searchBar/searchBar.jsx",
      "components/sort/sort.jsx",
      "components/tags/Tags.jsx",
      "components/Landing/hero.jsx",
      "components/RecipeList/RecipeList.js",
      "components/badges/badges.jsx",
      "helpers/mongoDB-utils.js",
      "pages/api/combined",
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
