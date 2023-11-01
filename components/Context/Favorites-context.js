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

  const addFavoritesHandler =async (recipe) => {
      try {
        const response = await fetch(`api/recipes/Favourites`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify( recipe ),
        });
        return response;
      } catch (error) {
      }
    
    setUserFavorites((prevUserFavorites) => {
      return prevUserFavorites.concat(recipe);
    });
  }
function removeFavoritesHandler(recipeId) {
  setUserFavorites((prevUserFavorites) => {
    return prevUserFavorites.filter((favorite) => favorite.id !== recipeId);
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
