import classes from "./loadMore.module.css";

const LoadMoreButton = ({
  handleLoad,
  remainingRecipes,
  totalRecipes,
  isLoadMore,
}) => {
  return (
    <div className="rounded items-center justify-center bg-blue-500 text-white p-2 mt-2 transition-transform hover:scale-105 duration-300 ease-in-out">
      <button
        onClick={handleLoad}
        disabled={
          (isLoadMore && remainingRecipes <= 0) ||
          (!isLoadMore && remainingRecipes >= totalRecipes)
        }
        className={`${classes.viewRecipeButton} w-full text-center ${
          (isLoadMore && remainingRecipes <= 0) ||
          (!isLoadMore && remainingRecipes >= totalRecipes)
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
      >
        {isLoadMore
          ? `Load More (${remainingRecipes})`
          : `Load Less (${remainingRecipes})`}
      </button>
    </div>
  );
};

export default LoadMoreButton;
