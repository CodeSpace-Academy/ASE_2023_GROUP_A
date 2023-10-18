import React, { useEffect, useState } from "react";
import RecipeCard from "../Cards/RecipeCard";
import Link from "next/link";
import Loading from "../Loading/Loading";
import LoadMoreButton from "../Buttons/LoadMore";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalRecipes, setTotalRecipes] = useState(0); // Initialize totalRecipes to 0

  useEffect(() => {
    const fetchRecipes = async (page) => {
      try {
        const response = await fetch(`/api/recipes?page=${page}`);
        if (response.ok) {
          const fetchedData = await response.json();

          // Update the total number of recipes from the API response
          const totalRecipesFromAPI = fetchedData.totalRecipes;
          setTotalRecipes(totalRecipesFromAPI);

          const newRecipes = fetchedData.recipes;
          if (page === 1) {
            setRecipes(newRecipes);
          } else {
            // Append new recipes to the existing list
            setRecipes([...recipes, ...newRecipes]);
          }

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
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Load More ({totalRecipes} remaining recipes)
        </button>
      </div>
    </div>
  );
};

export default RecipeList;