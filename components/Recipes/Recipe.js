import React, { useState } from "react";
import Link from "next/link";
import {
  CookTime,
  PrepTime,
  Published,
  TotalTime,
} from "../TimeAndDate/TimeConvertor";
import RecipeDetailTags from "../tags/RecipeDetailTags";
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
  const ingredientsList = Object.entries(recipe.ingredients).map((ingredient) => `${ingredient}`);

  const firstImage = recipe.images[0];

  return (
    <div className={`container mx-auto mt-24 p-4 ${textClass}`}>
      <Link href="/">
        <span className={`text-black-600 text-3xl ${textClass}`}>
          <FaArrowLeft />
        </span>
      </Link>
      <div
        className={`bg-${
          theme === "dark" ? "gray-700" : "white"
        } p-4 rounded shadow mb-4 lg:flex`}
      >
        <div className="lg:w-1/2">
          <h1 className={`text-2xl font-bold ${textClass}`}>
            {recipe.title}
          </h1>
          <CoverImage images={recipe.images} title={recipe.title} />
          <Description description={recipe.description} recipeId={recipe._id} />
          <div className={`mt-4 ${textClass}`}>
            <p>
              <FaUsers className="ml-4 mr-2" />
              <b>Servings</b>: {recipe.servings}
            </p>
          </div>
          <div className={`mt-4 ${textClass}`}>
            <p>
              <FiBook className="mr-2" />
              <b>Category</b>: {recipe.category}
            </p>
          </div>
          <div className={`mt-4 ${textClass}`}>
            <FaTag className="mr-2" />
            <b>Tags</b>
            <RecipeDetailTags recipe={recipe} />
          </div>
        </div>
        <div className={`lg:w-1/2 p-4 ${textClass}`}>
          
          <PrepTime prepTime={recipe.prep} />
          <CookTime cookTime={recipe.cook} />
          <TotalTime totalTime={recipe} />
          <Allergens
            allergens={Allergies}
            recipeIngredients={ingredientsList}
          />
          <h3 className="mt-2 text-lg font-semibold">Ingredients:</h3>
          <IngredientsList ingredients={Object.entries(recipe.ingredients)} />

          <h3 className={`text-lg font-semibold ${textClass}`}>Instructions</h3>
          <RecipeInstructions recipes={recipe} />

          <div className={`${textClass} mt-4`}>
            <Published published={recipe.published} />
          </div>

          {showInstructions && <RecipeInstructions recipes={recipe} />}
          <UpdateRecipeInstructions />
        </div>
      </div>
    </div>
  );
}

export default Recipe;



