import React from "react";
import Image from "next/image";
import CookTime from "../TimeAndDate/TimeConvertor";
import Link from "next/link";
import FavoriteButton from "../Buttons/Favorites/FavoritesButton";

//Fav Button
import { useContext } from "react";
import FavoritesContext from "@/store/Favorites-context";

const RecipeCard = ({ recipe }) => {
  if (!recipe) {
    return <div>Loading...</div>;
  }

  const firstImage = recipe.images[0];

  const favoriteCtx = useContext(FavoritesContext);

  const recipeIsFavorite = favoriteCtx.recipeIsFavorite(recipe.id);

  function toggleFavoriteButton() {
    if (recipeIsFavorite) {
      favoriteCtx.removeFavorite(recipe.id);
    } else {
      favoriteCtx.addFavorite({
        id: recipe.id,
        title: recipe.title,
        description: recipe.description,
        image: recipe.image,
      });
    }
  }
  return (
    <div className="bg-white-400 p-4 rounded shadow mt-8 mb-4 md:h-96 flex flex-col transform transition-transform hover:scale-105">
      {/* Make cards white */}
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
        <div className="mb-4 recipe-title-container text-center">
          <h2 className="text-sm sm:text-md md:text-lg lg:text-xl font-semibold mb-2">
            {recipe.title}
          </h2>
          <div className="mb-2">
            <CookTime cookTimeInMinutes={recipe.prep} label={"Prep Time"} />
          </div>
          <div className="mb-2">
            <CookTime cookTimeInMinutes={recipe.cook} label={"Cook Time"} />
          </div>
        </div>
        <div>
          <button onClick={toggleFavoriteButton}>
            {recipeIsFavorite ? "Remove from Faves" : "Add to Faves"}
          </button>
          {/* <FavoriteButton /> */}
        </div>
        <div className="rounded bg-red-500 text-white p-2 mt-2 transition-transform hover:scale-105 duration-300 ease-in-out">
          <Link href={`/${encodeURIComponent(recipe.title)}`}>
            <button className="w-full text-center view-recipe-button">
              View Recipe
            </button>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .view-recipe-button {
          background: linear-gradient(135deg, white 50%, red 50%);
          background-size: 200% 100%;
          background-position: 100% 0;
          transition: background-position 2s,
            color 0.6s cubic-bezier(0.75, 0, 0.25, 0);
          color: white;
        }

        .view-recipe-button:hover {
          background-position: 0 0;
          color: red;
        }

        .recipe-title-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 3rem; /* Adjust the minimum height as needed */
        }
      `}</style>
    </div>
  );
};

export default RecipeCard;
