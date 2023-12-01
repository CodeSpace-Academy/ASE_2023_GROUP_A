/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable indent */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable implicit-arrow-linebreak */
import { useState, createContext, useEffect } from "react";
// import useSWR from "swr";
const FavoritesContext = createContext({
  userFavorites: [],
  totalFavorites: 0,
  addFavorite: (recipeId) => { },
  removeFavorite: (recipeId) => { },
  recipeIsFavorite: (recipeId) => { },
  updateFavorites: (recipe) => { },
  addChangeListener: (listener) => { },
  removeChangeListener: (listener) => { },
});

export function FavoritesContextProvider({ children }) {
  const [userFavorites, setUserFavorites] = useState([]);
  const [changeListeners, setChangeListeners] = useState([]);
  // const fetcher = (url) => fetch(url).then((res) => res.json());

  // // Use the useSWR hook to fetch data for the user's favorite recipes
  // const { data: favoritesData, error } = useSWR(
  //   "/api/recipes/Favourites",
  //   fetcher,
  //   {
  //     revalidateOnFocus: false,
  //   }
  // );

  /**
   * A function to manually refresh the favorites data.
   * It triggers a revalidation of the 'favorites' data using the mutate function.
   */
  // const refreshFavorites = async () => {
  //   await mutate("api/recipes/Favourites");
  // };
  const fetchFavorites = async () => {
    const response = await fetch("/api/recipes/Favourites");
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  };
  useEffect(()=>{},[])

  const notifyChangeListeners = () => {
    changeListeners.forEach((listener) => {
      listener();
    });
  };
  const addFavoritesHandler = (recipe) => {
    setUserFavorites((prevUserFavorites) => [...prevUserFavorites, recipe]);
    notifyChangeListeners();
  };

  const updateFavoritesHandler = (recipes) => {
    setUserFavorites(recipes);
    notifyChangeListeners();
  };
  const removeFavoritesHandler = (recipeId) => {
    setUserFavorites((prevUserFavorites) => prevUserFavorites.filter((favorite) =>
      favorite._id !== recipeId));
    notifyChangeListeners();
  };

  function isRecipeInFavorites(recipeId, userfavorites) {
    if (Array.isArray(userfavorites)) {
      return userfavorites.some((recipe) => recipe && recipe._id === recipeId);
    }
      // If not an array, handle accordingly (assuming it's a single recipe)
      return userfavorites && userfavorites._id === recipeId;
  }

  const addChangeListener = (listener) => {
    setChangeListeners((prevListeners) => [...prevListeners, listener]);
  };

  const removeChangeListener = (listener) => {
    setChangeListeners((prevListeners) => prevListeners.filter((l) => l !== listener));
  };

  const context = {
    favorites: userFavorites,
    totalFavorites: userFavorites.length,
    addFavorite: addFavoritesHandler,
    updateFavorites: updateFavoritesHandler,
    removeFavorite: removeFavoritesHandler,
    recipeIsFavorite: isRecipeInFavorites,
    addChangeListener,
    removeChangeListener,
  };
    return (
      <FavoritesContext.Provider value={context}>
        {children}
      </FavoritesContext.Provider>
  );
}

export default FavoritesContext;
