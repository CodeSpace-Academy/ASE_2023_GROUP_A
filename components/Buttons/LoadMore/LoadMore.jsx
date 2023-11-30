import React from "react";
import classes from "./loadMore.module.css";
import { useTheme } from "../../Context/ThemeContext";

function LoadMoreButton({
  handleLoad,
  remainingRecipes,
  totalRecipes,
  isLoadMore,
  currentPage,
}) {
  const { theme } = useTheme();
  return (
    <div className={`${
      theme === "light" ? "text-black bg-blue-300" : "text-white bg-gray-700"
    } p-4 rounded shadow mt-8 mb-4 md:flex flex-col transform transition-transform hover:scale-105 items-center justify-center`}
    >
      <button
        type="button"
        onClick={handleLoad}
        disabled={
          (remainingRecipes <= 0)
          || (remainingRecipes === totalRecipes - 100)
          || (!isLoadMore && currentPage === 1)
          || (!isLoadMore && remainingRecipes >= totalRecipes)
        }
        className={`${classes.viewRecipeButton} w-full text-center ${
          (isLoadMore && remainingRecipes === 0)
          || (!isLoadMore && remainingRecipes === totalRecipes - 100)
            ? 'opacity-50 cursor-not-allowed'
            : ''
        }`}
      >
        {isLoadMore ? 'Next' : 'Previous'}
      </button>
    </div>
  );
}

export default LoadMoreButton;
