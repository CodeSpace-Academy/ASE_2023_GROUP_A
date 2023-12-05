import React, { useState } from "react";
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
import Allergens from "../Allergens/Allergens";
import CoverImage from "../Images/CoverImage";
import IngredientsList from "../Ingredients/IngredientsList";
import RecipeInstructions from "../Instructions/RecipeInstructions";
import Loading from "../Loading/Loading";
import { useTheme } from "../Context/ThemeContext";
import { usePageContext } from "../Context/CurrentPageContexts/CurrentHomePage";

function Recipe({ recipe, Allergies }) {
  const [showInstructions, setShowInstructions] = useState(false);
  const { theme } = useTheme();
  const { goBack } = usePageContext();
  if (!recipe) {
    return <Loading />;
  }

  const textClass = theme === "dark" ? "text-white" : "text-black";
  const ingredientsList = Object.entries(recipe.ingredients).map(
    (ingredient) => `${ingredient}`,
  );

  const downloadRecipe = async (format) => {
    try {
      const response = await fetch(
        `api/download?recipeId=${recipe._id}&format=${format}`,
      );
      if (response.ok) {
        const blob = await response.blob();

        if (navigator.msSaveOrOpenBlob) {
          // For Microsoft browsers
          navigator.msSaveOrOpenBlob(blob, `recipe_${recipe._id}.${format}`);
        } else {
          // For other browsers
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
        console.error("Error downloading recipe:", response.statusText);
        alert("Error downloading recipe. Please try again later.");
      }
    } catch (error) {
      console.error("Error downloading recipe:", error.message);
      alert("Error downloading recipe. Please try again later.");
    }
  };

  return (
    <div className={` mt-19 p-14 ${textClass}`}>
      <span
        className={`flex text-black-600 text-xl gap-2 p-4 mt-2 ${textClass}`}
      >
        <button
          type="button"
          onClick={goBack}
          className="ml-10 flex border bg-gradient-to-br from-white to-gray-400 text-white hover:text-blue-400 px-2 py-2 rounded-lg"
        >
          {" "}
          <FaArrowLeft className="mr-2" />
          <p>Back to More Recipes </p>
        </button>
      </span>
      <div
        className={`bg-${
          theme === "dark" ? "gray-700" : "white"
        } p-5 ml-14 mr-14 mb-5 rounded shadow`}
      >
        <div className="flex items-center justify-center">
          <div className="lg:w-1/2">
            <h1
              className={`text-2xl text-center font-bold mb-2 ml-15 ${textClass}`}
            >
              {recipe.title}
            </h1>
            <CoverImage
              images={recipe.images}
              title={recipe.title}
              className="rounded"
            />
            <Description
              description={recipe.description}
              recipeId={recipe._id}
            />

            <div className="flex items-center pt-2">
              <FaUsers className="mr-2" />
              <b>Servings</b>
              :
              {recipe.servings}
            </div>

            <div className="flex items-center">
              {" "}
              <FiBook className="mr-2" />
              <b>Category</b>
              :
              {recipe.category}
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
              <h3 className="mt-2 text-lg font-semibold">Ingredients:</h3>
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
    </div>
  );
}

export default Recipe;
