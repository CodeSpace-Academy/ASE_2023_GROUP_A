import React from "react";

import EnvError from "./error";
import RecipeList from "../components/RecipesList/RecipeList";

/**
 * The Home component displays a list of favorite recipes using data fetched from the server.
 * It utilizes the useSWR hook for data fetching and integrates with a FavoritesContext
 * to listen for changes in the user's favorite recipes.
 */
function Home() {
  // Check if required environment variables are present, if not, display an error component
  if (
    process.env === undefined
    || !process.env.mongodb_password
    || !process.env.mongodb_username
    || !process.env.mongodb_uri
  ) {
    return <EnvError />;
  }
  // Render the RecipeList component with the list of favorite recipes
  return <RecipeList />;
}

// Export the Home component as the default export
export default Home;
