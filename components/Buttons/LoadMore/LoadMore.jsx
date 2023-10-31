import { useEffect, useState } from "react";

// LoadMoreButton component that allows users to load more recipes
const LoadMoreButton = ({ handlePageChange, currentPage, totalRecipes }) => {
    // State to track the total number of pages based on the totalRecipes
    const [totalPages, setTotalPages] = useState(0);

    // UseEffect to update totalPages when totalRecipes changes
    useEffect(() => {
        // Calculate the total number of pages based on 100 recipes per page
        setTotalPages(Math.ceil(totalRecipes / 100) - totalPages * 100);
    }, [totalRecipes]);

    return (
        <div className="flex justify-between mt-4">
            <button
                onClick={handlePageChange}
                // Disable the button when currentPage is greater than or equal to totalPages
                disabled={currentPage >= totalPages}
                className={`bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                    currentPage >= totalPages ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
                Load More ({totalPages - currentPage * 100})
            </button>
        </div>
    );
};

export default LoadMoreButton;
