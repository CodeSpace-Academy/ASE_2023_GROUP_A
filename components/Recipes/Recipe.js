import { formatTime } from "../../helpers/TimeConvertor";
import RecipeCard from "../Cards/RecipeCard";
import RecipeInstructions from "../Instructions/RecipeInstructions";

const Recipe = (recipe) => {
  const recipes = recipe.recipe;

  if (!recipes) {
    return <div>Loading...</div>;
  }
  const ingredientsList = Object.entries(recipes.ingredients);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Recipe</h1>
      <ul>
        <li key={recipe._id} className="bg-amber-600 p-4 rounded shadow mb-4">
          <RecipeCard recipe={recipes} />

          <h3 className="mt-2 text-lg font-semibold">Ingredients:</h3>
          <ul className="list-disc list-inside">
            {ingredientsList.map(([ingredient, amount], index) => (
              <li key={index} className="text-gray-600">
                {ingredient}: {amount}
              </li>
            ))}
          </ul>

          <h4>
            <b>Total cooking Time:</b> {formatTime(recipes.cook)}
          </h4>

          <RecipeInstructions recipes={recipes} />
        </li>
      </ul>
    </div>
  );
};

export default Recipe;
