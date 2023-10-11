import { useEffect, useState } from "react";
import RecipeCard from "../Cards/RecipeCard";
import Link from "next/link";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); 
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchRecipes = async (page) => {
      try {
        const response = await fetch(`/api/recipes?page=${page}`);
        if (response.ok) {
          const fetchedRecipes = await response.json();
          setRecipes(fetchedRecipes.recipes);
          setTotalPages(fetchedRecipes.recipes.length);
          setLoading(false); 
        } else {
          console.error("Failed to fetch recipes");
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Recipes</h1>
      <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {recipes.map((recipe) => (
              <Link
                href={`/${encodeURIComponent(recipe.title)}`}
                key={recipe._id}
              >
                <RecipeCard key={recipe._id} recipe={recipe} />
              </Link>
            ))}
          </>
        )}
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Previous ({currentPage - 1} of {totalPages})
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Next ({currentPage + 1} of {totalPages})
        </button>
      </div>
    </div>
  );
};

export default RecipeList;
