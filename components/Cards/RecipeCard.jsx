import React from "react";
import Image from "next/image";
import theme from "./RecipeCard.module.css"
import { CookTime,PrepTime, TotalTime } from "../TimeAndDate/TimeConvertor";
//Fav Button
import { useContext } from "react";
import FavoritesContext from "@/components/Context/Favorites-context";
import ViewRecipeDetails from "../Buttons/ViewRecipeButton/ViewRicepe"

const RecipeCard = ({ recipe }) => {
  if (!recipe) {
    return <div>Loading...</div>;
  }

  const firstImage = recipe.images && recipe.images.length > 0 ? recipe.images[0] : recipe.image;


  const favoriteCtx = useContext(FavoritesContext);

  const recipeIsFavorite = favoriteCtx.recipeIsFavorite(recipe._id);

const toggleFavoriteButton=()=> {
    if (recipeIsFavorite) {
      favoriteCtx.removeFavorite(recipe._id);
    } else {
     favoriteCtx.addFavorite(recipe);
    }
  }

  return (
    <div className="bg-white-400 p-4 rounded shadow mt-8 mb-4 md:h-96 flex flex-col transform transition-transform hover:scale-105">
      <div className="w-full h-60 md:h-72 mb-4 relative aspect-w-16 aspect-h-9">
        <Image
          src={firstImage}
          alt={recipe.title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div className="flex flex-col justify-between h-full">
        <div className={`mb-4 ${theme.recipeTitleContainer} text-center`}>
          <h2 className="text-sm sm:text-md md:text-lg lg:text-xl font-semibold mb-2">
            {recipe.title}
          </h2>
          <div className="mb-2">
            <PrepTime prepTime={recipe.prep}/>
          </div>
          <div className="mb-2">
          <CookTime cookTime={recipe.cook} />
          </div>
        </div>
        <div>
          <button onClick={toggleFavoriteButton}>
            {recipeIsFavorite ? "Remove from Faves" : "Add to Faves"}
          </button>
          {/* <FavoriteButton /> */}
        </div>
      <ViewRecipeDetails recipe={recipe}/>
      </div>
    </div>
  );
};

export default RecipeCard;
