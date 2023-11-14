import React from "react";
import Link from "next/link";
import theme from "./ViewDetails.module.css";

// eslint-disable-next-line react/prop-types
function ViewRecipeDetails({ recipe }) {
  return (
    <div className="rounded bg-blue-500 text-white p-2 mt-2 transition-transform hover:scale-105 duration-300 ease-in-out">
      {/* eslint-disable-next-line react/prop-types */}
      <Link href={`/${encodeURIComponent(recipe.title)}`}>
        {/* eslint-disable-next-line react/button-has-type */}
        <button className={`w-full text-center ${theme.viewRecipeButton}`}>
          View Recipe
        </button>
      </Link>
    </div>
  );
}
// eslint-disable-next-line eol-last
export default ViewRecipeDetails;