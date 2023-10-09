import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "../../helpers/settings/settings";


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
          <h2 className="text-2xl font-semibold">{recipes.title}</h2>
          <p className="text-gray-600">{recipes.description}</p>
          <p className="text-gray-600">Prep Time: {recipes.prep} minutes</p>
          <p className="text-gray-600">Cook Time: {recipes.cook} minutes</p>
          <p className="text-gray-600">Category: {recipes.category}</p>
          <p className="text-gray-600">Servings: {recipes.servings}</p>
          <p className="text-gray-600">
            Published: {new Date(recipes.published).toLocaleDateString()}
          </p>
          <h3 className="mt-2 text-lg font-semibold">Tags:</h3>
         <ul className="list-disc list-inside">
            {recipes.tags.map((tag, index) => (
              <li key={index} className="text-gray-600">
                {tag}
              </li>
            ))}
          </ul>
          <h3 className="mt-2 text-lg font-semibold">Images</h3>
          <ul className="list-disc list-inside">
            <Carousel responsive={responsive}>
              {recipes.images.map((image, index) => (
                <div key={index} className="text-gray-600">
                  <div>
                    <Image
                      src={image}
                      alt={recipes.title}
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

