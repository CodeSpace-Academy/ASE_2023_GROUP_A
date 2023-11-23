import React, { useState } from "react";
import Link from "next/link";
import {
  CookTime,
  PrepTime,
  Published,
  TotalTime,
} from "../TimeAndDate/TimeConvertor";
import RecipeDetailTags from "../Tags/RecipeDetailTags";
import Description from "../Description/Description";
import Allergens from "../Allergens/allergens";

import CoverImage from "../Images/CoverImage";
import IngredientsList from "../ingredients/IngredientsList";
import RecipeInstructions from "../Instructions/RecipeInstructions";
import UpdateRecipeInstructions from "../Instructions/editRecipeInstructions";
import { FaArrowLeft, FaTag, FaUsers } from "react-icons/fa";
import { FiBook } from "react-icons/fi";
import Loading from "../Loading/Loading";
import { useTheme } from "../Context/ThemeContext";

function Recipe({ recipe, Allergies }) {
  const [showTags, setShowTags] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const { theme } = useTheme();

  if (!recipe) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  const textClass = theme === "dark" ? "text-white" : "text-black";
  const ingredientsList = Object.entries(recipe.ingredients).map(
    (ingredient) => `${ingredient}`
  );

  const firstImage = recipe.images[0];

  return (
    <div className={` mt-19 p-14 ${textClass}`}>
      <Link href='/'>
        <span
          className={`flex text-black-600 text-xl gap-2 p-4 mt-2 ${textClass}`}
        >
          <button className='ml-10 flex border bg-gradient-to-br from-white to-gray-400 text-white hover:text-blue-400 px-2 py-2 rounded-lg '>
            {" "}
            <FaArrowLeft className='mr-2' />
            <p>Back to More Recipes </p>
          </button>
        </span>
      </Link>
      <div
        className={`bg-${
          theme === "dark" ? "gray-700" : "white"
        } p-5 ml-14 mr-14 mb-5 rounded shadow mb-4`}
      >
        <div className=' flex items-center justify-center '>
          <div className=' lg:w-1/2'>
            <h1
              className={`text-2xl text-center font-bold mb-2 ml-15 ${textClass}`}
            >
              {recipe.title}
            </h1>
            <CoverImage
              images={recipe.images}
              title={recipe.title}
              className='rounded'
            />
            <Description
              description={recipe.description}
              recipeId={recipe._id}
            />

            <div className='flex items-center pt-2'>
              <FaUsers className=' mr-2' />
              <b>Servings</b>: {recipe.servings}
            </div>

            <div className='flex items-center'>
              {" "}
              <FiBook className='mr-2' />
              <b>Category</b>: {recipe.category}
            </div>

            <div className={` mt-2 ${textClass}`}>
              {" "}
              <RecipeDetailTags recipe={recipe} />
              <PrepTime prepTime={recipe.prep} />
              <CookTime cookTime={recipe.cook} />
              <TotalTime totalTime={recipe} />
              <Allergens
                allergens={Allergies}
                recipeIngredients={ingredientsList}
              />
              <h3 className='mt-2 text-lg font-semibold'>Ingredients:</h3>
              <IngredientsList
                ingredients={Object.entries(recipe.ingredients)}
              />
              <h3 className={`text-lg font-semibold ${textClass}`}>
                Instructions
              </h3>
              <RecipeInstructions recipes={recipe} />
              <div className={`${textClass} mt-4`}>
                <Published published={recipe.published} />
              </div>
              {showInstructions && <RecipeInstructions recipes={recipe} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recipe;
