import { useEffect, useState } from "react";
import RecipeCard from "../Cards/RecipeCard";
import Link from "next/link";
import LoadMoreButton from "../Buttons/LoadMore";
import fetchRecipes from "@/helpers/hook";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [originalRecipes, setOriginalRecipes] = useState([])

  useEffect(() => {
    
    fetchRecipes({setRecipes, setOriginalRecipes, setTotalRecipes, setLoading})

  }, []);

  const handlePageChange = () => {
    setCurrentPage((prevPage)=> prevPage + 1)
  const handlePageChange = (pageDelta) => {
    const newPage = currentPage + pageDelta;
    if (newPage > 0 && newPage <= totalRecipes) {
      setCurrentPage(newPage);
    }
  };


  return (
    <div>
      <h1 className="text-3xl font-bold font-mono mb-4">Recipes</h1>
      <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <>
            {recipes.map((recipe, index) => (
              <Link
                href={`/${encodeURIComponent(recipe.title)}`}
                key={index}
              >
                <RecipeCard key={recipe._id} recipe={recipe} description={recipe.description} />
              </Link>
            ))}
          </>
        {/* )} */}
      </div>

      {recipes.length > 0 && (
        <LoadMoreButton
          handlePageChange={() => handlePageChange(1)}
          currentPage={currentPage}
          totalRecipes={totalRecipes}
        />
      )}
      <div className="flex justify-between my-4">
        <button
          onClick={() => handlePageChange(-1)}
          disabled={currentPage === 1}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Load Previous
        </button>
      </div>

      {recipes.length > 0 && (
        <LoadMoreButton
          handlePageChange={() => handlePageChange(1)}
          currentPage={currentPage}
          totalRecipes={totalRecipes}
        />
      )}
    </div>
  );
};


export default RecipeList;
