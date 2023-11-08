/* eslint-enable */
import React from "react";
import Image from "next/image";
import theme from "./RecipeCard.module.css";
import { CookTime, PrepTime, TotalTime } from "../TimeAndDate/TimeConvertor";
//Fav Button
import Highlighter from "react-highlight-words";
import { useContext } from "react";
import FavoritesContext from "@/components/Context/Favorites-context";
import ViewRecipeDetails from "../Buttons/ViewRecipeButton/ViewRicepe";
import { StarIcon as StarFilled} from "@heroicons/react/24/solid";
import { StarIcon as StarEmpty } from "@heroicons/react/24/outline";
import { useTheme } from "../Context/ThemeContext";
import Loading from "../Loading/Loading";
const RecipeCard = ({ recipe, searchQuery, favorites }) => {
  const { theme } = useTheme()

  if (!recipe) {
    return <div><Loading/></div>;
  }

  const firstImage =
    recipe.images && recipe.images.length > 0 ? recipe.images[0] : recipe.image;

  const favoriteCtx = useContext(FavoritesContext);

  const recipeIsFavorite = favoriteCtx.recipeIsFavorite(recipe._id, favorites);

  const removeFavoriteHandler = (recipe) => async () => {
    try {
      const response = await fetch(`api/recipes/Favourites`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipeId: recipe._id }),
      });

      if (response.ok) {
        favoriteCtx.removeFavorite(recipe._id);
      }
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  const addFavoritesHandler = async (recipe) => {
    try {
      const response = await fetch(`api/recipes/Favourites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
      });
      favoriteCtx.addFavorite(recipe);
      return response;
    } catch (error) {}
  };

  return (
    <div
      key={recipe._id}
      className={`${
        theme === "light" ? " text-black" : "text-white"
      } bg-blue-300 p-4 rounded shadow mt-8 mb-4 md:h-96 flex flex-col transform transition-transform hover:scale-105`}
    >
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
          <h2 className="text-sm sm:text-md md:text-lg lg:text-xl font-semibold mb-2 font-alkatra">
            {searchQuery ? (
              <Highlighter
                highlightClassName="YourHighlightClass"
                searchWords={[searchQuery]}
                autoEscape={true}
                textToHighlight={recipe.title}
              />
            ) : (
              recipe.title
            )}
          </h2>
          <div className="mb-2">
            <PrepTime prepTime={recipe.prep} />
          </div>
          <div className="mb-2">
            <CookTime cookTime={recipe.cook} />
          </div>
        </div>
        <div>
          {recipeIsFavorite ? (
            <button onClick={removeFavoriteHandler(recipe)}>
              <span>
                <StarFilled
                  className={`w-6 h-6 ${
                    theme === "light" ? "text-blue-800" : "text-custom-blue-10"
                  }`}
                />
              </span>
            </button>
          ) : (
            <button onClick={() => addFavoritesHandler(recipe)}>
              <span>
                <StarEmpty
                  className={`w-6 h-6 ${
                    theme === "light" ? "text-blue-800" : "text-custom-blue-10"
                  }`}
                />
              </span>
            </button>
          )}
        </div>
        <ViewRecipeDetails recipe={recipe} />
      </div>
    </div>
  );
};

export default RecipeCard;
