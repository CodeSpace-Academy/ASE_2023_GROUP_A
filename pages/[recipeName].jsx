import { useRouter } from "next/router";
import Recipe from "../components/Recipes/Recipe";
// import Description from './../components/Description/Description';
import { useEffect, useState } from "react";

const RecipePage = () => {
  const router = useRouter();
  const { recipeName } = router.query;
  const [recipe, setRecipe] = useState();
  const [allergens, setAllergens] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/recipes/${recipeName}`);
      if (response.ok) {
        const data = await response.json();
        setRecipe(data.recipe);
        setAllergens(data.allergens);
      }
    };
    fetchData();
  }, []);
  if (!recipe || !recipe.description || !allergens) {
    console.log(`Can't find Recipe for:`, JSON.stringify(recipe));
  }
  if (!recipe || !recipe.description || !allergens) {
    return <div>Loading...</div>;
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
