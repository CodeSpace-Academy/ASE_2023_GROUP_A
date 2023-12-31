/* eslint-disable no-alert */
import React, { useState } from "react";
import Link from "next/link";
import { FiBook } from "react-icons/fi";
import { FaArrowLeft, FaUsers } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
import { Carousel } from 'react-responsive-carousel';
import {
  CookTime,
  PrepTime,
  Published,
  TotalTime,
} from "../TimeAndDate/TimeConvertor";
import RecipeDetailTags from "../Tags/RecipeDetailTags";
import Description from "../Description/Description";
import Allergens from "../Allergens/Allergens";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import CoverImage from "../Images/CoverImage";
import Loading from "../Loading/Loading";
import { useTheme } from "../Context/ThemeContext";

/**
 * Recipe Component displays detailed information about a recipe.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.recipe - The recipe object containing details like
 *  title, images, ingredients, instructions, etc.
 * @param {Array} props.Allergies - An array of allergens associated with the recipe.
 * @returns {JSX.Element} JSX element representing the Recipe component.
 */

function Recipe({ recipe, Allergies }) {
  /**
   * State to manage the visibility of recipe instructions.
   * @type {[boolean, function]}
   */
  const [showInstructions, setShowInstructions] = useState(false);
  const initialStepsToShow = 7;
  const [visibleSteps, setVisibleSteps] = useState(initialStepsToShow);

  const [showIngredients, setShowIngredients] = useState(false);
  const initialIngredientsToShow = 6;
  const [visibleIngredients, setVisibleIngredients] = useState(initialIngredientsToShow);

  const { theme } = useTheme();

  // Loading state check
  if (!recipe) {
    return <Loading />;
  }

  // Theme and container styling based on the theme
  const textClass = theme === "dark" ? "text-white" : "text-black";
  const containerClass = theme === "dark" ? "bg-gray-700" : "bg-blue";

  // Extracting ingredients for rendering
  const ingredientsList = Object.entries(recipe.ingredients).map(
    (ingredient) => `${ingredient}`,
  );

  // Handlers for showing/hiding ingredients
  const handleShowMoreIngredients = () => {
    setShowIngredients(true);
    setVisibleIngredients(recipe.ingredients.length);
  };

  const handleShowLessIngredients = () => {
    setShowIngredients(false);
    setVisibleIngredients(initialIngredientsToShow);
  };

  // Rendering visible ingredients
  const renderedIngredients = Object.entries(recipe.ingredients)
    .slice(0, visibleIngredients)
    .map(([ingredient, quantity]) => (
      <li key={uuidv4()} className="mb-0 list-disc">
        {`${ingredient}: ${quantity}`}
      </li>
    ));

  // Handlers for showing/hiding instructions
  const handleShowMore = () => {
    setShowInstructions(true);
    setVisibleSteps(recipe.instructions.length);
  };

  const handleShowLess = () => {
    setShowInstructions(false);
    setVisibleSteps(initialStepsToShow);
  };

  // Rendering visible instructions
  const renderedInstructions = recipe.instructions
    .slice(0, visibleSteps)
    .map((step, index) => (
      <p key={uuidv4()} className="mb-2">
        {`${index + 1}. ${step}`}
      </p>
    ));

  // downloadRecipe function
  const downloadRecipe = async (format) => {
    try {
      const response = await fetch(
        `api/download?recipeId=${recipe._id}&format=${format}`,
      );
      if (response.ok) {
        const blob = await response.blob();

        if (navigator.msSaveOrOpenBlob) {
          navigator.msSaveOrOpenBlob(blob, `recipe_${recipe._id}.${format}`);
        } else {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `recipe_${recipe._id}.${format}`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      } else {
        throw new Error("Error downloading recipe:", response.statusText);
      }
    } catch (err) {
      alert(`Error downloading recipe. Please try again later.${err}`);
      return err;
    }
  };

  // Component rendering
  return (
    <div className={`mt-12 p-6 lg:p-12 ${textClass}`}>
      <Link href="/">
        <span className={`flex text-xl gap-2 p-2 ${textClass}`}>
          <button
            type="button"
            className="ml-10 flex border bg-gradient-to-br from-white to-gray-400 text-white hover:text-blue-400 px-3 py-2 rounded-lg items-center"
          >
            <FaArrowLeft className="mr-2 mt-1" />
            <p>Back to More Recipes</p>
          </button>
        </span>
      </Link>

      <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${containerClass} rounded-lg shadow-lg p-6`}>
        <div>
          <h1 className={`text-3xl font-bold mb-4 ${textClass}`}>
            {recipe.title}
          </h1>
          <div className="rounded mb-4 relative">
            <div
              className="absolute top-0 left-0 right-0 bottom-0"
              style={{ borderRadius: '0.5rem' }}
            />
            <Carousel style={{ width: '100%' }}>
              {recipe.images.map((image) => (
                <div key={uuidv4()} style={{ height: '500px', width: '100%' }}>
                  <CoverImage images={[image]} title={recipe.title} className="rounded" />
                </div>
              ))}
            </Carousel>
          </div>
          <Description description={recipe.description} recipeId={recipe._id} />

          {/* Additional recipe details */}
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

          {/* Timings, Allergens, and Published information */}
          <div className={`mt-2 ${textClass}`}>
            <PrepTime prepTime={recipe.prep} />
            <CookTime cookTime={recipe.cook} />
            <TotalTime totalTime={recipe} />
            <Allergens allergens={Allergies} recipeIngredients={ingredientsList} />
            <div className="mt-4">
              <h3 className="text-2xl font-semibold">Published</h3>
              <Published published={recipe.published} />
            </div>
          </div>
        </div>

        {/* Ingredients, Tags, and Instructions */}
        <div className={`space-y-12 ${textClass}`}>
          {/* Ingredients Section */}
          <div className="border-8 border-purple-500 mt-14 p-4 rounded-lg">
            <h3 className="text-2xl font-semibold">Ingredients:</h3>
            {renderedIngredients}
            {Object.entries(recipe.ingredients).length > initialIngredientsToShow && (
              <button
                type="button"
                className="text-blue-500 cursor-pointer"
                onClick={showIngredients ? handleShowLessIngredients : handleShowMoreIngredients}
              >
                {showIngredients ? "Show Less" : "Show More"}
              </button>
            )}
          </div>

          {/* Recipe Tags Section */}
          <RecipeDetailTags recipe={recipe} />

          {/* Instructions Section */}
          <div className="border-8 border-green-500 p-4 rounded-lg space-y-0">
            <h3 className="text-2xl font-semibold">Instructions</h3>
            {renderedInstructions}
            {recipe.instructions.length > initialStepsToShow && (
              <button
                type="button"
                className="text-blue-500 cursor-pointer"
                onClick={showInstructions ? handleShowLess : handleShowMore}
              >
                {showInstructions ? "Show Less" : "Show More"}
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="flex mt-4 space-x-4">
        <button
          type="button"
          onClick={() => downloadRecipe("json")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Download JSON
        </button>
        <button
          type="button"
          onClick={() => downloadRecipe("text")}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Download Text
        </button>
        <button
          type="button"
          onClick={() => downloadRecipe("pdf")}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Download PDF
        </button>
        <button
          type="button"
          onClick={() => downloadRecipe("excel")}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Download Excel
        </button>
      </div>
    </div>
  );
}

export default Recipe;
