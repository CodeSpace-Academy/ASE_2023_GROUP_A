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

export function FavoritesContextProvider(props) {
  const [userFavorites, setUserFavorites] = useState([]);
  const [changeListeners, setChangeListeners] = useState([]);
    /**
   * A function to manually refresh the favorites data.
   * It triggers a revalidation of the 'favorites' data using the mutate function.
   */
    const fetchFavorites = async () => {
      try {
        const response = await fetch("/api/recipes/Favourites");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data.favorites || [];
      } catch (error) {
        console.error("Error fetching favorites:", error);
        return [];
      }
    };
    useEffect(() => {
      const fetchFavoritesData = async () => {
        try {
          const favorites = await fetchFavorites();
          if (favorites) {
            setUserFavorites(favorites);
          }
        } catch (error) {
          console.error("Error fetching favorites:", error);
        }
      };

      fetchFavoritesData();
    }, []);
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
    return userfavorites
    && Array.from(userfavorites)
    .some((recipe) => recipe && recipe._id === recipeId);
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
        {props.children}
      </FavoritesContext.Provider>
  );
}

export default FavoritesContext;
