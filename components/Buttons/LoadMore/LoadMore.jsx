import React from "react";
import classes from "./loadMore.module.css";
import { useTheme } from "../../Context/ThemeContext";

/**
 * LoadMoreButton component for handling pagination.
 * @param {Object} props - The component props
 * @param {Function} props.handleLoad - Function to handle the load action.
 * @param {number} props.remainingRecipes - The number of remaining recipes.
 * @param {number} props.totalRecipes - The total number of recipes.
 * @param {boolean} props.isLoadMore - Flag to indicate whether it is a load more action.
 * @param {number} props.currentPage - The current page number.
 * @returns {JSX.Element} - The rendered LoadMoreButton component.
 */
function LoadMoreButton({
  handleLoad,
  remainingRecipes,
  totalRecipes,
  isLoadMore,
  currentPage,
}) {
  const { theme } = useTheme();

  /**
   * Handles the click event on the load more button.
   *
   * @function
   * @inner
   * @param {Event} event - The click event.
   */
  const handleClick = () => {
    // Additional logic or event handling if needed
    handleLoad();
  };

  return (
    <div className={`${
      theme === "light" ? "text-black bg-blue-300" : "text-white bg-gray-700"
    } p-4 rounded shadow mt-8 mb-4 md:flex flex-col transform transition-transform hover:scale-105 items-center justify-center`}
    >
      <button
        type="button"
        onClick={handleClick}
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
