import React, { useState } from "react";
import {
  CookTime,
  PrepTime,
  Published,
  TotalTime,
} from "../TimeAndDate/TimeConvertor";
import RecipeDetailTags from "../Tags/RecipeDetailTags";
import Description from "../Description/Description";
import Allergens from "../Allergens/allergens";
import DropDownSVG from "../IconsAndSvg's/DropDownSVG";
import CoverImage from "../Images/CoverImage";
import IngredientsList from "../ingredients/IngredientsList";
import RecipeInstructions from "../Instructions/RecipeInstructions";
import UpdateRecipeInstructions from "../Instructions/editRecipeInstructions";
import Link from "next/link"; // Import Link
import { FaArrowLeft } from "react-icons/fa"; // Import FaArrowLeft
import Loading from "../Loading/Loading";
import { useTheme } from "../Context/ThemeContext";

const Recipe = ({ recipe, Allergies }) => {
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
    <div className={`container mx-auto mt-24 p-4 ${textClass}`}>
      <Link href="/">
      <span className={`text-black-600 text-xl ${textClass}`} style={{ fontSize: '2em' }}>
          <FaArrowLeft />
        </span>
      </Link>
      <div className={`bg-${theme === "dark" ? "gray-700" : "white"} p-4 rounded shadow mb-4 lg:flex`}>
        <div className="lg:w-1/2">
        <h1 className={`text-2xl font-bold ${textClass}`}>{recipe.title}</h1>
          <CoverImage images={recipe.images} title={recipe.title} />
          <div className={`mt-4 ${textClass}`}>
            <p>
              <b>Servings</b>: {recipe.servings} people
            </p>
          </div>
          <div className={`mt-4 ${textClass}`}>
            <p>
              <b>Category</b>: {recipe.category}
            </p>
          </div>
          <div className={`mt-4 ${textClass}`}>
            {/* <button
              onClick={() => setShowTags(!showTags)}
              className={`bg-yellow-500 hover:bg-yellow-600 flex flex-row ${textClass} font-bold py-2 px-4 rounded mb-4`}
            > */}
            {/* <b>
            {/* </button> */}
            {/* {showTags && (
              <div> */} 
             <b>Tags</b> 
                <RecipeDetailTags recipe={recipe} />
              {/* </div>
            )} */}
          </div>
        </div>
        <div className="lg-w-1/2 p-4 ${textClass}">
          <Description description={recipe.description} recipeId={recipe._id} />
          <PrepTime prepTime={recipe.prep} />
          <CookTime cookTime={recipe.cook} />
          <TotalTime totalTime={recipe} />
          <Allergens
            allergens={Allergies}
            recipeIngredients={ingredientsList}
          />
          <h3 className="mt-2 text-lg font-semibold">Ingredients:</h3>
          <IngredientsList ingredients={Object.entries(recipe.ingredients)} />
          <CookTime
            cookTimeInMinutes={recipe.cook}
            label={"Total Cooking Time"}
          />
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className={`bg-indigo-500 hover:bg-indigo-600 ${textClass} flex flex-row font-bold py-2 px-4 rounded mb-4`}
          >
            <h3 className={`text-lg font-semibold ${textClass}`}>Instructions</h3>
            <DropDownSVG />
          </button>
          {/* {showInstructions && <RecipeInstructions recipes={recipe} />}
          <UpdateRecipeInstructions /> */}
         <div className={`${textClass} mt-4`}>
            <Published published={recipe.published} />
          </div>
          {showInstructions && <RecipeInstructions recipes={recipe} />}
          <UpdateRecipeInstructions />
        </div>
      </div>
    </div>
  );
};

export default Recipe;
