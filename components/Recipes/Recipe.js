import React from "react";
import RecipeCard from "../Cards/RecipeCard";
import CookTime from "../TimeAndDate/TimeConvertor";
import RecipeInstructions from "../Instructions/RecipeInstructions";
import UpdateRecipeInstructions from "../Instructions/editRecipeInstructions";
import Tags from "../Tags/Tags";
import Image from "next/image";

const Recipe = (props) => {
  const { recipe } = props;

  if (!recipe) {
    return <div>Loading...</div>;
  }

  const ingredientsList = Object.entries(recipe.ingredients);
  const firstImage = recipe.images[0];
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-4 rounded shadow mb-4 lg:flex"> {/* Use flex for layout */}
        <div className="lg:w-1/2"> {/* Left column for image */}
        {/* <RecipeCard recipe={recipe} hideViewRecipeButton={true} /> */}
        <h1>{recipe.title}</h1>
        <div>
          <Image src={firstImage}
          alt={recipe.title}
          width={300}
          height={300}
          layout="responsive"
          className="max-w-full h-auto object-cover"/>
         
        </div>
        </div>
        <div className="lg:w-1/2 p-4"> {/* Right column for text */}
          <CookTime cookTimeInMinutes={recipe.prep} label={"Prep Time"} />
          <CookTime cookTimeInMinutes={recipe.cook} label={"Cook Time"} />
          <CookTime
            cookTimeInMinutes={recipe.cook}
            prepTimeInMinutes={recipe.prep}
            label="Total Time"
          />
          <h3 className="mt-2 text-lg font-semibold">Ingredients:</h3>
          <ul className="list-disc list-inside">
            {ingredientsList.map(([ingredient, amount], index) => (
              <li key={index} className="text-gray-600">
                {ingredient}: {amount}
              </li>
            ))}
          </ul>
          <CookTime cookTimeInMinutes={recipe.cook} label={'Total Cooking Time'} />
          <RecipeInstructions recipes={recipe} />
          <UpdateRecipeInstructions />
          <p className="text-gray-600">
            <b>Category:</b> {recipe.category}
          </p>
          <p className="text-gray-600">
            <b>Servings:</b> {recipe.servings}
          </p>
          <b>Published:</b>
          <p className="text-gray-600">
            {new Date(recipe.published).toLocaleDateString()}
          </p>
          <Tags recipe={recipe} />
        </div>
      </div>
    </div>
  );
};

export default Recipe;
