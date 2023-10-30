import { useContext } from "react";
import FavoritesContext from "@/store/Favorites-context";

import RecipeList from "@/components/RecipesList/RecipeList";
import Link from "next/link";

function FavoritesPage() {
  const favoriteCtx = useContext(FavoritesContext);

  let content;

  if (favoriteCtx.totalFavorites === 0) {
    content = <img src="../Images/nix.png" alt="No Likes" />;
  } else {
    content = <RecipeList recipes={favoriteCtx.recipe} />;
  }

  return (
    <section>
      <strong>
        <h1 className="py-10 px-5 mx-20 my-10">My Favorites</h1>
      </strong>
      <section className="mx-5">
        {content}{" "}
        <Link href={`/recipeList`} className="py-10 px-5 mx-12 ">
          <strong> Explore Recipes</strong>
        </Link>
      </section>
    </section>
  );
}

export default FavoritesPage;
