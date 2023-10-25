import React, { useEffect, useState } from "react";
import RecipeCard from "../Cards/RecipeCard";
import CookTime from "../TimeAndDate/TimeConvertor";
import RecipeInstructions from "../Instructions/RecipeInstructions";
import UpdateRecipeInstructions from "../Instructions/editRecipeInstructions";
import Tags from "../Tags/Tags";
import Image from "next/image";
import Description from "../Description/Description";

const Recipe = (props) => {
  const { recipe } = props;
  const [showCategory, setShowCategory] = useState(false);
  const [showServings, setShowServings] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  const ingredientsList = Object.entries(recipe.ingredients);
  const firstImage = recipe.images[0];

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-4 rounded shadow mb-4 lg:flex">
        <div className="lg:w-1/2">
          <h1>{recipe.title}</h1>
          <div>
            <Image
              src={firstImage}
              alt={recipe.title}
              width={300}
              height={300}
              layout="responsive"
              className="max-w-full h-auto object-cover"
            />
          </div>
          <div className="mt-4 text-gray-600">
            <button
              onClick={() => setShowServings(!showServings)}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-4"
            >
              <b>Servings</b>
            </button>
            {showServings && (
              <div>
                <p>{recipe.servings}</p>
              </div>
            )}
          </div>
          <div>
            <button
              onClick={() => setShowCategory(!showCategory)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
            >
              <b>Category</b>
            </button>
            {showCategory && <p>{recipe.category}</p>}
          </div>
          <div>
          <button
              onClick={() => setShowTags(!showTags)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mb-4"
            >
              <b>Tags</b>
            </button>
            {showTags && (
              <div>
                <Tags recipe={recipe} />
              </div>
            )}
          </div>
        </div>
        <div className="lg:w-1/2 p-4">
          <Description description={recipe.description} recipeId={recipe._id} />
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
          <CookTime
            cookTimeInMinutes={recipe.cook}
            label={"Total Cooking Time"}
          />
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded mb-4"
          >
            <h3 className="text-lg font-semibold">Instructions</h3>
          </button>
          {showInstructions && <RecipeInstructions recipes={recipe} />}
          <UpdateRecipeInstructions />
          <div className="text-gray-600 mt-4">
            <b>Published:</b>
            <p>{new Date(recipe.published).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
