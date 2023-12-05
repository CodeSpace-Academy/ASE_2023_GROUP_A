import React, { useContext, useState, useEffect } from "react";

import Image from "next/legacy/image";
import { toast } from "react-toastify";

import { StarIcon as StarEmpty } from "@heroicons/react/24/outline";
import { StarIcon as StarFilled } from "@heroicons/react/24/solid";

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
import LoadingCard from "./LoadingCard";
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
const RecipeCard = ({
  recipe,
  searchQuery,
  Key,
}) => {
  const [recipeIsFavorite, setRecipeIsFavorite] = useState(false);
  const { theme } = useTheme();
  const favoriteCtx = useContext(FavoritesContext);
  const favorites = favoriteCtx.favorites || [];
  useEffect(() => {
    const isFavorite = favoriteCtx.recipeIsFavorite(recipe._id, favorites);
    setRecipeIsFavorite(isFavorite);
  }, [favorites, favoriteCtx, recipe._id]);

  // Determine the first image for the recipe
  const firstImage = recipe.images && recipe.images.length > 0
    ? recipe.images[0] : recipe.image;

  // Check if the recipe is marked as a favorite
  if ((!recipe)) {
    return <LoadingCard />;
  }
  const removeFavoriteHandler = async () => {
    // Display a confirmation dialog
    const userConfirmed = window.confirm(
      "Are you sure you want to remove this recipe from your favorites?",
    );
    if (userConfirmed) {
      try {
        // Send a request to remove the recipe from MongoDB
        const response = await fetch(`/api/recipes/Favourites`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ recipeId: recipe._id }),
        });

        if (response.ok) {
          // Update the state and display a success message
          favoriteCtx.removeFavorite(recipe._id);
          // favoriteCtx.removeChangeListener(refreshFavorites);
          toast.success("Recipe removed from favorites!");
          // refreshFavorites();
        } else {
          toast.error("Error removing recipe from favorites.");
        }
      } catch (error) {
        console.error("Error removing favorite:", error);
        toast.error("Error removing recipe from favorites.");
      }
    }
  };

  // Add a recipe to favorites
  const addFavoritesHandler = async () => {
    try {
      // Check if the recipe is already a favorite
      if (!recipeIsFavorite) {
        // Add the recipe to MongoDB
        const response = await fetch(`/api/recipes/Favourites`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(recipe),
        });

        if (response.ok) {
          // Update the state and display a success message
          favoriteCtx.addFavorite(recipe);
          // favoriteCtx.addChangeListener(refreshFavorites);
          toast.success("Recipe added to favorites!");
        } else {
          toast.error("Error adding recipe to favorites.");
          throw new Error("Error removing recipe from favorites.");
          // refreshFavorites();
        }
      }
    } catch (error) {
      toast.error("Error adding recipe to favorites.");
      return error;
    }
  };
  const decodeHtmlEntities = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const correctedTitle = decodeHtmlEntities(recipe.title);

  return (
    <div
      key={`${Key},${recipe.title}`}
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
            title={correctedTitle}
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
                  className={`w-6 h-6 ml-5 ${theme === "dark" ? "text-white" : "text-custom-blue-10"}`}
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
};

export default RecipeCard;
