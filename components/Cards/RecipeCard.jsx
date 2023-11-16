/* eslint-disable operator-linebreak */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/control-has-associated-label */
import Image from "next/legacy/image";

import React, { useContext } from "react";
import { StarIcon as StarFilled } from "@heroicons/react/24/solid";
import { StarIcon as StarEmpty } from "@heroicons/react/24/outline";
import FavoritesContext from "../Context/Favorites-context";
import ViewRecipeDetails from "../Buttons/ViewRecipeButton/ViewRecipe";
import { CookTime, PrepTime, TotalTime } from "../TimeAndDate/TimeConvertor";
import { useTheme } from "../Context/ThemeContext";
import Title from "./Title";
import Loading from "../Loading/Loading";

// eslint-disable-next-line react/function-component-definition
const RecipeCard = ({
  // eslint-disable-next-line react/prop-types
  recipe,
  // eslint-disable-next-line react/prop-types
  searchQuery,
  // eslint-disable-next-line react/prop-types
  favorites,
  // eslint-disable-next-line react/prop-types
  Key,
}) => {
  const { theme } = useTheme();

  if (!recipe) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  // eslint-disable-next-line no-underscore-dangle, react/prop-types
  const firstImage =
    recipe.images && recipe.images.length > 0 ? recipe.images[0] : recipe.image;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const favoriteCtx = useContext(FavoritesContext);
  // eslint-disable-next-line no-underscore-dangle, react/prop-types
  const recipeIsFavorite = favoriteCtx.recipeIsFavorite(recipe._id, favorites);

  // eslint-disable-next-line no-shadow
  const removeFavoriteHandler = (recipe) => async () => {
    try {
      const response = await fetch(`api/recipes/Favourites`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        // eslint-disable-next-line no-underscore-dangle, react/prop-types
        body: JSON.stringify({ recipeId: recipe._id }),
      });

      if (response.ok) {
        // eslint-disable-next-line no-underscore-dangle, react/prop-types
        favoriteCtx.removeFavorite(recipe._id);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error removing favorite:", error);
    }
  };

  // eslint-disable-next-line consistent-return, no-shadow
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
      // eslint-disable-next-line no-empty
    } catch (error) {}
  };

  return (
    <div
      key={Key}
      className={`${
        theme === "light" ? "text-black bg-blue-400" : "text-white bg-gray-900"
      } p-4 rounded  shadow mt-20 mb-5 md:h-100 flex flex-col transform transition-transform hover:scale-105`}
    >
      <div className="w-full h-60 md:h-92 mb-4 relative aspect-w-16 aspect-h-9">
        <Image
          src={firstImage}
          // eslint-disable-next-line react/prop-types
          alt={recipe.title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div className="flex flex-col justify-between h-22 pb-5">
        <div
          className={`mb-4 text-center ${
            theme === "dark" ? "text-white" : ""
          } `}
        >
          <Title
            key={`${recipe._id}${recipe.title}`}
            title={recipe.title}
            searchQuery={[searchQuery]}
          />

          <div className="mb-1">
            {/* eslint-disable-next-line react/prop-types */}
            <PrepTime prepTime={recipe.prep} />
          </div>
          <div className="mb-">
            {/* eslint-disable-next-line react/prop-types */}
            <CookTime cookTime={recipe.cook} />
          </div>
          <TotalTime totalTime={recipe} />
        </div>
        <div>
          {recipeIsFavorite ? (
            <button type="button" onClick={removeFavoriteHandler(recipe)}>
              <span aria-label="Remove from favorites">
                <StarFilled
                  className={`w-6 h-6 ${
                    theme === "light" ? "text-blue-900" : "text-custom-blue-10"
                  }`}
                />
              </span>
            </button>
          ) : (
            <button type="button" onClick={() => addFavoritesHandler(recipe)}>
              <span aria-label="Add to favorites">
                <StarEmpty
                  className={`w-6 h-6 ${
                    theme === "dark" ? "text-white" : "text-custom-blue-10"
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
