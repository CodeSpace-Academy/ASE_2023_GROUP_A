import React from "react";
import Link from "next/link";
import theme from "./ViewDetails.module.css";

/**
 * ViewRecipeDetails component for displaying a button to view recipe details.
 * @param {Object} props - The component props
 * @param {Object} props.recipe - The recipe data.
 * @param {string} props.recipe.title - The title of the recipe.
 * @returns {JSX.Element} - The rendered ViewRecipeDetails component.
 */
function ViewRecipeDetails({ recipe }) {
  return (
    <div className="rounded bg-blue-500 text-white p-2 m-2 transition-transform hover:scale-90 duration-300 ease-in-out">
      <Link href={`/${encodeURIComponent(recipe.title)}`}>
        <button
          type="button"
          className={`w-full text-center ${theme.viewRecipeButton}`}
        >
          View Recipe
        </button>
      </Link>
    </div>
  );
}

export default ViewRecipeDetails;
