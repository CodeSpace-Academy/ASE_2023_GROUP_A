import RecipeCard from "../Cards/RecipeCard";
const Recipe  = (recipe) => {
  const  recipes   = recipe.recipe;
  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Recipe</h1>
      <ul>
        <li key={recipe._id} className="bg-purple-300 p-4 rounded shadow mb-4">
        <RecipeCard recipe={recipes} />
          <h3 className="mt-2 text-lg font-semibold">Ingredients:</h3>
          <ul className="list-disc list-inside">
            {Object.entries(recipes.ingredients).map(
              ([ingredient, amount], index) => (
                <li key={index} className="text-gray-600">
                  {ingredient}: {amount}
                </li>
              )
            )}
          </ul>
          <h3 className="mt-2 text-lg font-semibold">Instructions</h3>
          <ul className="list-disc list-inside">
            {recipes.instructions.map((instruction, index) => (
              <li key={index} className="text-gray-600">
                {instruction}
              </li>
            ))}
          </ul> 
        </li>
      </ul>
    </div>
  );
};

export default Recipe;

