import React, { useContext, useEffect } from "react";
import EnvError from "./error";
import Loading from "@/components/Loading/Loading";
import FavoritesContext from "@/components/Context/Favorites-context";
import useSWR, { mutate } from "swr";
import RecipeList from "@/components/RecipesList/RecipeList";

const Home = () => {
  const favoriteContext = useContext(FavoritesContext);

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const {
    data: favoritesData,
    error,
    isLoading,
  } = useSWR("api/recipes/Favourites", fetcher);

  // A function to manually refresh the favorites data
  const refreshFavorites = async () => {
    // Trigger a revalidation of the 'favorites' data
    await mutate("api/recipes/Favourites");
  };

  // Set up an event listener for changes in favorites
  useEffect(() => {
    favoriteContext.addChangeListener(refreshFavorites);
    return () => favoriteContext.removeChangeListener(refreshFavorites);
  }, []);

  if (
    process.env == {} ||
    !process.env.mongodb_password ||
    !process.env.mongodb_username
  ) {
    return <EnvError />;
  }

  if (error || !favoritesData) {
    return <Loading />;
  }

  const favorites = favoritesData.favorites || [];
  

  return (
    <>
      <RecipeList favorites={favorites} />
    </>
  );
};

export default Home;
