import { useState, createContext } from "react";

const FavoritesContext = createContext({
  userFavorites: [],
  totalFavorites: 0,
  addFavorite: (recipeId) => {},
  removeFavorite: (recipeId) => {},
  recipeIsFavorite: (recipeId) => {},
});

export function FavoritesContextProvider(props) {

  const [userFavorites, setUserFavorites] = useState([]);

  function addFavoritesHandler(recipeId) {
    setUserFavorites((prevUserFavorites) => {
      return prevUserFavorites.concat(recipeId);
    });
  }
  function removeFavoritesHandler(recipeId) {
    setUserFavorites((prevUserFavorites) => {
      return prevUserFavorites.filter((id) => id !== recipeId);
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
