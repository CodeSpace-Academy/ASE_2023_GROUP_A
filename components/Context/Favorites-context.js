import { useState, createContext } from "react";

const FavoritesContext = createContext({
  userFavorites: [],
  totalFavorites: 0,
  addFavorite: (recipeId) => {},
  removeFavorite: (recipeId) => {},
  recipeIsFavorite: (recipeId) => {},
  updateFavorites: (recipe) => {},
});

export function FavoritesContextProvider(props) {
  const [userFavorites, setUserFavorites] = useState([]);

const addFavoritesHandler = (recipe) => {
  setUserFavorites((prevUserFavorites) => [...prevUserFavorites, recipe]);
};

  const updateFavoritesHandler = (recipes) => {
    setUserFavorites(recipes);
  };

const removeFavoritesHandler = (recipeId) => {
  setUserFavorites((prevUserFavorites) => {
    return prevUserFavorites.filter((favorite) => favorite._id !== recipeId);
  });
};

function isRecipeInFavorites(recipeId, userFavorites) {
  return Array.from(userFavorites).some((recipe) => recipe && recipe._id === recipeId);
}


  const context = {
    favorites: userFavorites,
    totalFavorites: userFavorites.length,
    addFavorite: addFavoritesHandler,
    updateFavorites: updateFavoritesHandler,
    removeFavorite: removeFavoritesHandler,
    recipeIsFavorite: isRecipeInFavorites,
  };

  return (
    <FavoritesContext.Provider value={context}>
      {props.children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContext;
