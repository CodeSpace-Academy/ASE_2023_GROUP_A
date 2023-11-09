import classes from "./loadMore.module.css";

const LoadMoreButton = ({
  handleLoad,
  remainingRecipes,
  totalRecipes,
  isLoadMore,
  currentPage,
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
          (isLoadMore && remainingRecipes === 0) ||
          (!isLoadMore && remainingRecipes === totalRecipes - currentPage * 100)
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
      >
        {isLoadMore ? `Next` : `Previous)`}
      </button>
    </div>
  );
};

export default LoadMoreButton;
