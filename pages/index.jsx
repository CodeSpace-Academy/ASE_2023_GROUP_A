import React, { useContext, useEffect } from "react";
import { mutate } from "swr";
import { usePageContext } from "../components/Context/CurrentPageContexts/CurrentHomePage";
import EnvError from "./error";
import Loading from "../components/Loading/Loading";
import FavoritesContext from "../components/Context/Favorites-context";
import RecipeList from "../components/RecipesList/RecipeList";

/**
 * The Home component displays a list of favorite recipes using data fetched from the server.
 * It utilizes the useSWR hook for data fetching and integrates with a FavoritesContext
 * to listen for changes in the user's favorite recipes.
 */
function Home() {
  // Access the FavoritesContext to manage and listen for changes in favorite recipes
  const favoriteContext = useContext(FavoritesContext);

  // Custom fetcher function for useSWR to fetch favorite recipes data
  // const fetcher = (url) => fetch(url).then((res) => res.json());

  // Use the useSWR hook to fetch data for the user's favorite recipes
  // const { data: favoritesData, error } = useSWR(
  //   "api/recipes/Favourites",
  //   fetcher,
  //   {
  //     revalidateOnFocus: false,
  //   }
  // );
  // const favoritesData = favoriteContext;
  /**
   * A function to manually refresh the favorites data.
   * It triggers a revalidation of the 'favorites' data using the mutate function.
   */
  const refreshFavorites = async () => {
    await mutate("api/recipes/Favourites");
  };

  // Set up an event listener for changes in favorite recipes
  useEffect(() => {
    // Add the refreshFavorites function as a change listener
    favoriteContext.addChangeListener(refreshFavorites);

    // Clean up the event listener when the component is unmounted
    return () => favoriteContext.removeChangeListener(refreshFavorites);
  }, []);

  // Check if required environment variables are present, if not, display an error component
  if (
    process.env === undefined ||
    !process.env.mongodb_password ||
    !process.env.mongodb_username ||
    !process.env.mongodb_uri
  ) {
    return <EnvError />;
  }

  // If there is an error fetching data or no data is available, display a loading component
  // if ( !favoritesData) {
  //   return <Loading />;
  // }

  // Extract the list of favorite recipes from the fetched data
  const favorites = favoriteContext.userFavorites || [];

  // Render the RecipeList component with the list of favorite recipes
  return <RecipeList favorites={favorites} />;
}
// Create a file, for example, utils/api.js
// const getBaseURL = () => {
//   if (process.env.NODE_ENV === "development") {
//     // Development environment
//     return "http://localhost:3000";
//   } else {
//     // Production or other environments
//     return process.env.NEXT_PUBLIC_BASE_URL || "";
//   }
// };

  // export const getServerSideProps = async ({ query }) => {
  
  //   const { page = 1 } = query;
  //   const baseURL = getBaseURL();
  //   const response = await fetch(`${baseURL}/api/recipes?page=${page}`);
  //   const data = await response.json();
  //   return {
  //     props: {
  //       initialData: data,
  //     },
  //   };
  // };

// Export the Home component as the default export
export default Home;
