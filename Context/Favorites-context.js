import { useState, createContext } from "react";

const FavoritesContext = createContext({
  favorites: [],
  totalFavorites: 0,
  addFavorite: (favoriteRecipe) => {},
  removeFavorite: (recipeId) => {},
  itemIsFavorite: (recipeId) => {},
});

export function FavoritesContextProvider(props) {
  const [userFavorites, setUserFavorites] = useState([]);

  function addFavoritesHandler(favoriteRecipe) {
    setUserFavorites((prevUserFavorites) => {
      return prevUserFavorites.concat(favoriteRecipe);
    });
  }
  function removeFavoritesHandler(recipeId) {
    setUserFavorites((prevUserFavorites) => {
      return prevUserFavorites.filter((recipe) => recipe.id !== recipeId);
    });
  }

  function recipeIsFavoriteHandler(recipeId) {
    return userFavorites.some((recipe) => recipe.id === recipeId);
  }

  const context = {
    favorites: userFavorites,
    totalFavorites: userFavorites.length,
    addFavorite: addFavoritesHandler,
    removeFavorite: removeFavoritesHandler,
    recipeIsFavorite: recipeIsFavoriteHandler,
  };

  return (
    <FavoritesContext.Provider value={context}>
      {props.children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContext;
