import classes from './loadMore.module.css'

const LoadMoreButton = ({handleLoadMore, remainingRecipes  }) => {
   
    return (

        <div className="rounded bg-red-500 text-white p-2 mt-2 mb-4 transition-transform hover:scale-105 duration-300 ease-in-out">

            <button
                onClick={handleLoadMore}
                disabled={remainingRecipes<=0}
                className={`${classes.viewRecipeButton} w-full text-center ${
                    remainingRecipes<=0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
                Load More ({remainingRecipes})

            </button>

        </div>

    );

};

export default LoadMoreButton;
