import { useContext } from "react";
import FavoritesContext from "@/components/Context/Favorites-context";
import RecipeCard from "../components/Cards/RecipeCard";
import Link from "next/link";
import Loading from "@/components/Loading/Loading";

function FavoritesPage({ theme }) {
  const favoriteCtx = useContext(FavoritesContext);
  const favoriteRecipes = favoriteCtx.favorites || [];
  const noFavoritesImg =
    theme === "dark"
      ? "/Images/no-favorites-dark.png"
      : "Images/no-favorites-light.png";

  if (!favoriteRecipes) {
    return <Loading />;
  }

  return (
    <section>
      <strong>
        <h1 className="py-10 px-5 mx-20 my-10">My Favorites</h1>
      </strong>
      <section className="mx-5">
        {favoriteRecipes.length === 0 ? (
          <div>
            <img src={noFavoritesImg} alt="No Likes" />
            <p>
              Sorry, you don't have any favorites yet. Tap the star icon to
              favorite a recipe
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoriteRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe.recipe}
                favorites={favoriteRecipes}
              />
            ))}
          </div>
        )}
        <Link href={`/`} className="py-10 px-5 mx-12">
          <strong> Explore Recipes</strong>
        </Link>
      </section>
    </section>
  );
}

export default FavoritesPage;
