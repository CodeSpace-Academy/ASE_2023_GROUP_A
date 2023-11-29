import React, { useContext } from "react";
import Image from "next/legacy/image";
import { StarIcon as StarFilled } from "@heroicons/react/24/solid";
import { StarIcon as StarEmpty } from "@heroicons/react/24/outline";
import {
  CookTime,
  PrepTime,
  TotalTime,
  Steps,
  Published,
} from "../TimeAndDate/TimeConvertor";
import FavoritesContext from "../Context/Favorites-context";
import ViewRecipeDetails from "../Buttons/ViewRecipeButton/ViewRecipe";
import { useTheme } from "../Context/ThemeContext";
import Loading from "../Loading/Loading";
import Title from "./Title";

/**
 * RecipeCard component displays a recipe card with details and interaction buttons.
 *
 * @component
 * @param {object} props - The properties of the component.
 * @param {object} props.recipe - The recipe data.
 * @param {string} props.searchQuery - The search query for highlighting.
 * @param {array} props.favorites - The array of favorite recipes.
 * @param {string} props.Key - The unique key for the recipe card.
 * @returns {JSX.Element} - The rendered RecipeCard component.
 */
function RecipeCard({ recipe, searchQuery, favorites, Key }) {
  const { theme } = useTheme();
  const favoriteCtx = useContext(FavoritesContext);

  // Display loading spinner if recipe data is not available
  if (!recipe) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  // Determine the first image for the recipe
  const firstImage =
    recipe.images && recipe.images.length > 0 ? recipe.images[0] : recipe.image;

  // Check if the recipe is marked as a favorite
  const recipeIsFavorite = favoriteCtx.recipeIsFavorite(recipe._id, favorites);

  // Remove a recipe from favorites
  const removeFavoriteHandler = async () => {
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

  // Add a recipe to favorites
  const addFavoritesHandler = async () => {
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
    } catch (error) {
      console.error("Error adding favorite:", error);
      return undefined;
    }
  };

  return (
    <div
      key={Key}
      className={`${
        theme === "light" ? "text-black bg-blue-300" : "text-white bg-gray-700"
      } rounded shadow mt-8 mb-4 flex flex-col transform transition-transform hover:scale-105`}
    >
      <div className="w-full h-56 md:h-92 mb-4 relative aspect-h-9">
        <Image
          src={firstImage}
          alt={recipe.title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="flex flex-col justify-between h-22 pb-2">
        <div
          className={`mb-4 text-center ${
            theme === "dark" ? "text-white" : ""
          } `}
        >
          {/* Display recipe title with optional highlighting */}
          <Title
            key={`${recipe._id}${recipe.title}`}
            title={recipe.title}
            searchQuery={[searchQuery]}
          />
          <div className="pl-5">
            <PrepTime prepTime={recipe.prep} />
            <CookTime cookTime={recipe.cook} />
            <TotalTime totalTime={recipe} />
            <Published published={recipe.published} />
            <Steps instructions={recipe.instructions} />
          </div>
        </div>
        <div>
          {/* Display favorite button */}
          {recipeIsFavorite ? (
            <button type="button" onClick={removeFavoriteHandler}>
              <span aria-label="Remove from favorites">
                {/* Display filled star icon for favorites */}
                <StarFilled
                  className={`w-6 h-6 ml-5 ${
                    theme === "light" ? "text-blue-900" : "text-custom-blue-10"
                  }`}
                />
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={addFavoritesHandler}
              aria-label="Add to favorites"
            >
              <span>
                {/* Display empty star icon for non-favorites */}
                <StarEmpty
                  className={`w-6 h-6 ml-5 ${
                    theme === "dark" ? "text-white" : "text-custom-blue-10"
                  }`}
                />
              </span>
            </button>
          )}
        </div>
        {/* Display button to view recipe details */}
        <ViewRecipeDetails recipe={recipe} />
      </div>
    </div>
  );
}

export default RecipeCard;
