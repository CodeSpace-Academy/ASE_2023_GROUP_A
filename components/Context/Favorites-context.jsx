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
import { useState, createContext } from "react";

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
