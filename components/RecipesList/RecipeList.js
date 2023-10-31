import { useEffect, useState } from "react";
import RecipeCard from "../Cards/RecipeCard";
import Link from "next/link";
import LoadMoreButton from "../Buttons/LoadMore";
import fetchRecipes from "@/helpers/hook";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Initialize loading state
  const [totalRecipes, setTotalRecipes] = useState(0); // Add totalRecipes state

  useEffect(() => {
    
    fetchRecipes({setRecipes, setOriginalRecipes, setTotalRecipes, setLoading})

  }, []);

  const handlePageChange = () => {
    setCurrentPage((prevPage) => prevPage + 1);
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
        )}
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
