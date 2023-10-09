import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "../../helpers/settings/settings";
import { RecipeData } from "../Types/recipeTypes";
const Recipe: React.FC<{ recipe: RecipeData }>  = (recipe: any) => {
  if (!recipe.recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Recipe</h1>
      <ul>
        <li key={recipe._id} className="bg-purple-300 p-4 rounded shadow mb-4">
          <h2 className="text-2xl font-semibold">{recipe.recipe.title}</h2>
          <p className="text-gray-600">{recipe.recipe.description}</p>
          <p className="text-gray-600">Prep Time: {recipe.recipe.prep} minutes</p>
          <p className="text-gray-600">Cook Time: {recipe.recipe.cook} minutes</p>
          <p className="text-gray-600">Category: {recipe.recipe.category}</p>
          <p className="text-gray-600">Servings: {recipe.recipe.servings}</p>
          <p className="text-gray-600">
            Published: {new Date(recipe.recipe.published).toLocaleDateString()}
          </p>
          <h3 className="mt-2 text-lg font-semibold">Tags:</h3>
         <ul className="list-disc list-inside">
            {recipe.recipe.tags.map((tag: any, index: any) => (
              <li key={index} className="text-gray-600">
                {tag}
              </li>
            ))}
          </ul>
          <h3 className="mt-2 text-lg font-semibold">Images</h3>
          <ul className="list-disc list-inside">
            <Carousel responsive={responsive}>
              {recipe.recipe.images.map((image: any, index: any) => (
                <div key={index} className="text-gray-600">
                  <div>
                    <Image
                      src={image}
                      alt={recipe.recipe.title}
                      width={300}
                      height={300}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              ))}
            </Carousel>
          </ul>
          <h3 className="mt-2 text-lg font-semibold">Ingredients:</h3>
          <ul className="list-disc list-inside">
            {Object.entries(recipe.recipe.ingredients).map(
              ([ingredient, amount]: any, index) => (
                <li key={index} className="text-gray-600">
                  {ingredient}: {amount}
                </li>
              )
            )}
          </ul>
          <h3 className="mt-2 text-lg font-semibold">Instructions</h3>
          <ul className="list-disc list-inside">
            {recipe.recipe.instructions.map((instruction: string, index: number) => (
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

