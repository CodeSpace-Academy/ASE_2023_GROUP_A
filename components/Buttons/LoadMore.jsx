import { useEffect, useState } from "react";
const LoadMoreButton =({ handlePageChange, currentPage, totalRecipes })=>{
    const [totalPages, setTotalPages] = useState(0);
    useEffect(()=>{
        setTotalPages(Math.ceil(totalRecipes / 100) - totalPages * 100);
    },[totalRecipes])
    return(
        <div className="flex justify-between mt-4">
        <button
          onClick={handlePageChange}
          disabled={currentPage >= totalPages}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            currentPage >= totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Load More ({ (totalPages) - (currentPage * 100)})
        </button>
      </div>
    )
};
export default LoadMoreButton;