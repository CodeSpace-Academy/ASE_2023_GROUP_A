"";
import CookTime from "../TimeAndDate/TimeConvertor";
import RecipeCard from "../Cards/RecipeCard";
import RecipeInstructions from "../Instructions/RecipeInstructions";
import Allergens from "../Allergens/allergens";

const Recipe = ({ recipe, Allergies }) => {
  const recipes = recipe;

  // If there's no recipe data available, display a loading message
  if (!recipes) {
    return <div>Loading...</div>;
  }

  // Convert the ingredients object into an array of key-value pairs
  const ingredientsList = Object.entries(recipes.ingredients);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Recipe</h1>
      <ul>
        <li key={recipe._id} className="bg-amber-600 p-4 rounded shadow mb-4">
          <RecipeCard recipe={recipes} />
          <Allergens allergens={Allergies} />
          <h3 className="mt-2 text-lg font-semibold">Ingredients:</h3>
          <ul className="list-disc list-inside">
            {ingredientsList.map(([ingredient, amount], index) => (
              <li key={index} className="text-gray-600">
                {ingredient}: {amount}
              </li>
            ))}
          </ul>

          <CookTime
            cookTimeInMinutes={recipes.cook}
            label={"Total cooking Time"}
          />

          <ul className="list-disc list-inside">
            {recipes.instructions.map((instruction, index) => (
              <li key={index} className="text-gray-600">
                {instruction}
              </li>
            ))}
          </ul>

          {/* Render the RecipeInstructions component to display recipe instructions */}
          <RecipeInstructions recipes={recipes} />
        </li>
      </ul>
    </div>
  );
};

export default Recipe;
