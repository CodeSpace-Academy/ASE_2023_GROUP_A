/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-no-duplicate-props */
import React, { useContext } from "react";
import Link from "next/link";
import FavoritesContext from "../components/Context/Favorites-context";
import RecipeCard from "../components/Cards/RecipeCard";
import Loading from "../components/Loading/Loading";

function FavoritesPage({ theme }) {
  const favoriteCtx = useContext(FavoritesContext);
  const favoriteRecipes = favoriteCtx.favorites || [];
  const noFavoritesImg = theme === "light"
    ? "Images/no-favorites-light.png"
    : "/Images/no-favorites-dark.png";

  if (!favoriteRecipes) {
    return <Loading />;
  }

  return (
    <section className="mt-0 flex-grow h-screen pt-10">
      <strong>
        <h1 className="py-10 px-5 mx-20 my-10">My Favorites</h1>
      </strong>
      <section className="mx-5 justify-center">
        {favoriteRecipes.length === 0 ? (
          <>
            <img src={noFavoritesImg} alt="No Likes" />
            <p>
              Sorry, you don&apos;t have any favorites yet. Tap the star icon to
              add a favorite recipe
            </p>
          </>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoriteRecipes.map((recipe) => (
              <RecipeCard
                Key={recipe.recipe._id}
                key={recipe.recipe._id}
                recipe={recipe.recipe}
                favorites={favoriteRecipes}
              />
            ))}
          </div>
        )}
        <Link href="/" className="py-10 px-5 mx-12">
          <strong> Explore Recipes</strong>
        </Link>
      </section>
    </section>
  );
}

export default FavoritesPage;