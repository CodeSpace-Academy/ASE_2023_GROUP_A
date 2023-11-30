import React, { useState } from "react";
import Link from "next/link";
import { FiBook } from "react-icons/fi";
import { FaArrowLeft, FaUsers } from "react-icons/fa";
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
import Loading from "../Loading/Loading";
import { useTheme } from "../Context/ThemeContext";

/**
 * React component for displaying a recipe, including details, image, and instructions.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.recipe - The recipe object containing information like title, images, etc.
 * @param {Object[]} props.Allergies - An array of allergens associated with the recipe.
 * @returns {JSX.Element} The Recipe component.
 */
function Recipe({ recipe, Allergies }) {
  // State to control the visibility of instructions
  const [showInstructions] = useState(false);

  // Access the current theme from the ThemeContext
  const { theme } = useTheme();

  // Check if the recipe object is available, otherwise, display a loading indicator
  if (!recipe) {
    return <Loading />;
  }

  // Determine text and container classes based on the theme
  const textClass = theme === "dark" ? "text-white" : "text-black";
  const containerClass = theme === "dark" ? "bg-gray-700" : "bg-blue";

  // Convert ingredients object to a list for display
  const ingredientsList = Object.entries(recipe.ingredients).map(
    (ingredient) => `${ingredient}`,
  );

  return (
    <div className={`mt-12 p-6 lg:p-12 ${textClass}`}>
      {/* Link to navigate back to the list of recipes */}
      <Link href="/">
        <span className={`flex text-xl gap-2 p-4 ${textClass}`}>
          <button
            type="button"
            className="ml-10 flex border bg-gradient-to-br from-white to-gray-400 text-white hover:text-blue-400 px-3 py-2 rounded-lg"
          >
            <FaArrowLeft className="mr-2" />
            <p>Back to More Recipes</p>
          </button>
        </span>
      </Link>

      {/* Recipe details grid */}
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${containerClass} rounded-lg shadow-lg p-6`}>
        {/* Left column with recipe information */}
        <div>
          <h1 className={`text-3xl font-bold mb-4 ${textClass}`}>
            {recipe.title}
          </h1>
          <div className="rounded border-4 border-blue-500 mb-4 relative">
            <div
              className="absolute top-0 left-0 right-0 bottom-0 border-t-4 border-l-4 border-r-4 border-b-4 border-blue-500"
              style={{ borderRadius: '0.5rem' }}
            />
            <CoverImage images={recipe.images} title={recipe.title} className="rounded" />
          </div>
          <Description description={recipe.description} recipeId={recipe._id} />

          {/* Display servings and category information */}
          <div className="flex items-center mt-2">
            <FaUsers className="mr-2" />
            <b>Servings:</b>
            {' '}
            {recipe.servings}
          </div>
          <div className="flex items-center mt-2">
            <FiBook className="mr-2" />
            <b>Category:</b>
            {' '}
            {recipe.category}
          </div>

          <div className={`mt-2 ${textClass}`}>
            <RecipeDetailTags recipe={recipe} />
            <PrepTime prepTime={recipe.prep} />
            <CookTime cookTime={recipe.cook} />
            <TotalTime totalTime={recipe} />
            <Allergens allergens={Allergies} recipeIngredients={ingredientsList} />
            {/* Container for published information */}
            <div className="mt-4">
              <h3 className="text-2xl font-semibold">Published</h3>
              <Published published={recipe.published} />
            </div>
          </div>
        </div>

        {/* Right column with ingredients, instructions, and an optional display of instructions */}
        <div className={`space-y-4 ${textClass}`}>
          <div className="border-4 border-purple-500 p-4 rounded-lg">
            <h3 className="text-2xl font-semibold">Ingredients:</h3>
            <IngredientsList ingredients={Object.entries(recipe.ingredients)} />
          </div>

          <div className="border-4 border-green-500 p-4 rounded-lg">
            <h3 className="text-2xl font-semibold">Instructions</h3>
            <RecipeInstructions recipes={recipe} />
          </div>

          {showInstructions && <RecipeInstructions recipes={recipe} />}
        </div>
      </div>
    </div>
  );
}

export default Recipe;
