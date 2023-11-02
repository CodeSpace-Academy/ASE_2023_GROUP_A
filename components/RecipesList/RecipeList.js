import React, { useEffect, useState } from "react";
import RecipeCard from "../Cards/RecipeCard";
import LoadMoreButton from "../Buttons/LoadMore";
import fetchRecipes from "@/helpers/hook";
import SearchBar from "../Search/SearchBar";


const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [originalRecipes, setOriginalRecipes] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    fetchRecipes({
      setRecipes,
      setOriginalRecipes,
      setTotalRecipes,
      setLoading,
    });
  }, []);

  const handlePageChange = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleSearch = (term) => {
    const filteredRecipes = originalRecipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(term.toLowerCase())
    );
    setRecipes(filteredRecipes);
    setCurrentPage(1);
  };

  return (
    <div>
      <div className="w-full">
        <img
          src="https://www.royco.co.za/cdn-cgi/image/width=1440,height=640,f=auto,quality=90/sites/g/files/fnmzdf1866/files/2023-04/Recipe%20BackgroundUpdate.jpg"
          alt="Hero Image"
          className="w-full"
        />
      </div>

      <div>
        <SearchBar onSearch={handleSearch} searchHistory={searchHistory} setSearchHistory={setSearchHistory} />
      </div>

      <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {recipes.map((recipe, index) => (
          <div href={`/${encodeURIComponent(recipe.title)}`} key={index}>
            <RecipeCard key={recipe._id} recipe={recipe} description={recipe.description} />
          </div>
        ))}
      </div>

      {recipes.length > 0 && (
        <div className="flex justify-center mt-4">
          <LoadMoreButton
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            totalRecipes={totalRecipes}
          />
        </div>
      )}
    </div>
  );
};

export default RecipeList;
