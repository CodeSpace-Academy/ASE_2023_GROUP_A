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
import Allergens from "../Allergens/allergens";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import CoverImage from "../Images/CoverImage";
import Loading from "../Loading/Loading";
import { useTheme } from "../Context/ThemeContext";

function Recipe({ recipe, Allergies }) {
  const [showInstructions, setShowInstructions] = useState(false);
  const initialStepsToShow = 7;
  const [visibleSteps, setVisibleSteps] = useState(initialStepsToShow);

  const [showIngredients, setShowIngredients] = useState(false);
  const initialIngredientsToShow = 6;
  const [visibleIngredients, setVisibleIngredients] = useState(initialIngredientsToShow);

  const { theme } = useTheme();

  if (!recipe) {
    return <Loading />;
  }

  const textClass = theme === "dark" ? "text-white" : "text-black";
  const containerClass = theme === "dark" ? "bg-gray-700" : "bg-blue";

  const ingredientsList = Object.entries(recipe.ingredients).map(
    (ingredient) => `${ingredient}`,
  );

  const handleShowMoreIngredients = () => {
    setShowIngredients(true);
    setVisibleIngredients(recipe.ingredients.length);
  };

  const handleShowLessIngredients = () => {
    setShowIngredients(false);
    setVisibleIngredients(initialIngredientsToShow);
  };

  const renderedIngredients = Object.entries(recipe.ingredients)
    .slice(0, visibleIngredients)
    .map(([ingredient, quantity]) => (
      <li key={uuidv4()} className="mb-0 list-disc">
        {`${ingredient}: ${quantity}`}
      </li>
    ));

  const handleShowMore = () => {
    setShowInstructions(true);
    setVisibleSteps(recipe.instructions.length);
  };

  const handleShowLess = () => {
    setShowInstructions(false);
    setVisibleSteps(initialStepsToShow);
  };

  const renderedInstructions = recipe.instructions
    .slice(0, visibleSteps)
    .map((step, index) => (
      <p key={uuidv4()} className="mb-2">
        {`${index + 1}. ${step}`}
      </p>
    ));

  return (
    <div className={`mt-12 p-6 lg:p-12 ${textClass}`}>
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

        <div className={`space-y-12 ${textClass}`}>
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
          <RecipeDetailTags recipe={recipe} />
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
    </div>
  );
}

export default Recipe;
