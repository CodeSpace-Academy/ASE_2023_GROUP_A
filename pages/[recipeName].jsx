import React, { useRouter } from "next/router";
import useSWR from "swr";
import Recipe from "../components/Recipes/Recipe";
import Loading from "../components/Loading/Loading";

const fetcher = (url) => fetch(url).then((res) => res.json());

const RecipePage = () => {
  const router = useRouter();
  const { recipeName } = router.query;

  // Fetch recipe data and allergens using useSWR
  const { data, error } = useSWR(`api/recipes/${recipeName}`, fetcher);

  if (error || !data) {
    return <div><Loading /></div>;
  }

  const { recipe, allergens } = data;

  if (!recipe || !recipe.description || !allergens) {
    <p>
      Can&rsquo;t find recipes for
      $
      {recipeName}
    </p>;
  }

  return (
    <div>
      <Recipe
        recipe={recipe}
        description={recipe.description}
        Allergies={allergens}
      />
    </div>
  );
};

export default RecipePage;
