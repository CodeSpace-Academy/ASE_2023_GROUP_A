/**
 * The RecipeList component is a React component that fetches recipes from an API, displays them in a
 * grid, and provides a button to load more recipes.
 * @returns The RecipeList component is returning a JSX element.
 */
import React, { useEffect, useState } from "react";
import RecipeCard from "../Cards/RecipeCard";
import LoadMoreButton from "../Buttons/LoadMore/LoadMore";
import Loading from "../Loading/Loading";
import { useContext } from "react";
import FavoritesContext from "../Context/Favorites-context";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalRecipes, setTotalRecipes] = useState(0);

  const favoritesContext = useContext(FavoritesContext);
  const favorites = favoritesContext.favorites || [];

  useEffect(() => {
    const fetchRecipes = async (page) => {
      try {
        const response = await fetch(`/api/recipes?page=${page}`);
        if (response.ok) {
          const fetchedRecipes = await response.json();

          setRecipes((prevRecipes) => [
            ...prevRecipes,
            ...fetchedRecipes.recipes,
          ]);
          setTotalRecipes(fetchedRecipes.totalRecipes);
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

  const handlePageChange = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="items-center justify-center place-content-center">
        <h1 className="text-3xl font-bold font-dm_mono mb-4 items-center justify-center place-content-center">
          Recipes
        </h1>
      </div>
      <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <>
          {recipes.map((recipe, index) => (
            <div key={index}>
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
                favorites={favorites}
                description={recipe.description}
              />
            </div>
          ))}
        </>
      </div>

      <div className="items-center justify-center place-content-center">
        <LoadMoreButton
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          totalRecipes={totalRecipes}
        />
      </div>
    </>
  );
};

export default RecipeList;
