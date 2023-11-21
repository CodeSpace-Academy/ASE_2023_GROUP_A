/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable import/order */
/* eslint-disable operator-linebreak */
/* eslint-disable eqeqeq */
/* eslint-disable import/no-unresolved */
import React, {
  useContext,
  useEffect,
} from 'react';

import useSWR, { mutate } from 'swr';

import FavoritesContext from '@/components/Context/Favorites-context';
import Loading from '@/components/Loading/Loading';
import RecipeList from '@/components/RecipesList/RecipeList';

import EnvError from './error';

function Home() {
  const favoriteContext = useContext(FavoritesContext);

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const {
    data: favoritesData,
    error,
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
    // eslint-disable-next-line operator-linebreak
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
    <RecipeList favorites={favorites} />
  );
}

export default Home;
