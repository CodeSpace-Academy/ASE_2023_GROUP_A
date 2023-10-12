import React, { useEffect, useState } from "react";
import RecipeCard from "../Cards/RecipeCard";
import Link from "next/link";
import Loading from "../Loading/Loading";
import LoadMoreButton from "../Buttons/LoadMore";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Initialize loading state
  const [totalRecipes, setTotalRecipes] = useState(0); // Add totalRecipes state

  useEffect(() => {
    const fetchRecipes = async (page) => {
      try {
        const response = await fetch(`/api/recipes?page=${page}`);
        if (response.ok) {
          const fetchedRecipes = await response.json();
          setRecipes((prevRecipes)=>[...prevRecipes, ...fetchedRecipes.recipes]);
          setTotalRecipes(fetchedRecipes.totalRecipes);
          setLoading(false); // Set loading to false when data is fetched
        } else {
          console.error("Failed to fetch recipes");
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes(currentPage);
  }, [currentPage]);

  const handlePageChange = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Recipes</h1>
      <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? (
          <Loading/>
        ) : (
          <>
            {recipes.map((recipe, index) => (
              <Link
                href={`/${encodeURIComponent(recipe.title)}`}
                key={index}
              >
                <RecipeCard key={recipe._id} recipe={recipe} />
              </Link>
            ))}
          </>
        )}
      </div>

<LoadMoreButton handlePageChange={handlePageChange} currentPage={currentPage} totalRecipes={totalRecipes}/>

    </div>
  );
};

export default RecipeList;
