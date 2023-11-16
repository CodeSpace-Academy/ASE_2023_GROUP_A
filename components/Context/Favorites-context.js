import { useState, createContext } from "react";

const FavoritesContext = createContext({
  userFavorites: [],
  totalFavorites: 0,
  addFavorite: (recipeId) => {},
  removeFavorite: (recipeId) => {},
  recipeIsFavorite: (recipeId) => {},
  updateFavorites: (recipe) => {},
  addChangeListener: (listener) => {},
  removeChangeListener: (listener) => {},
});

export function FavoritesContextProvider(props) {
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
    setUserFavorites((prevUserFavorites) => prevUserFavorites.filter((favorite) => favorite._id !== recipeId));
    notifyChangeListeners();
  };

  function isRecipeInFavorites(recipeId, userFavorites) {
    return Array.from(userFavorites).some((recipe) => recipe && recipe._id === recipeId);
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
