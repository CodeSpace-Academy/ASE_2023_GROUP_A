import React, { useEffect, useState } from "react";
import RecipeCard from "../Cards/RecipeCard";
import Link from "next/link";
import LoadMoreButton from "../Buttons/LoadMore";
import fetchRecipes from "@/helpers/hook";

const SearchBar = ({ onSearch, searchHistory, setSearchHistory }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchHistoryVisible, setSearchHistoryVisible] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(null); // State to store the search delay timer

  const handleSearch = (term) => {
    setSearchTerm(term);
    setSearchHistoryVisible(true);
    // Clear any existing timeout and set a new one
    clearTimeout(searchTimeout);
    const newTimeout = setTimeout(() => {
      // Perform the search action after the delay
      onSearch(searchTerm);
    }, 300); // Adjust the delay time (in milliseconds) as needed
    setSearchTimeout(newTimeout);
  };

  const clearSearch = () => {
    setSearchTerm(""); // Clear the search input
    setSearchHistory([]); // Clear the search history
    setSearchHistoryVisible(false); // Hide the history container
  };

  const handleSearchClick = () => {
    if (searchTerm) {
      onSearch(searchTerm);

      // Update the search history with only the 5 most recent entries
      setSearchHistory((prevHistory) => {
        const updatedHistory = [searchTerm, ...prevHistory].slice(0, 5);
        return updatedHistory;
      });

      setSearchTerm(""); // Clear the search input
      setSearchHistoryVisible(false); // Hide the history container
    }
  };

  return (
    <div className="bg-white p-4 relative">
      <div className="flex items-center">
        <div className="ml-2"></div>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onClick={() => setSearchHistoryVisible(true)}
          onChange={(e) => handleSearch(e.target.value)}
          className="px-2 py-1 border rounded-md border-gray-400 focus:outline-none focus:ring focus:border-blue-300"
          style={{ maxWidth: "300px" }}
        />

        <div className="ml-2"></div>
        <button
          className="ml-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          onClick={handleSearchClick}
        >
          Search
        </button>
        <div className="ml-2"></div>
        <button
          className="ml-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          onClick={clearSearch}
        >
          Clear
        </button>
      </div>
      {searchHistoryVisible && searchHistory.length > 0 && (
        <div
          className="bg-white p-1 border border-gray-300 rounded mt-1"
          style={{ maxHeight: "50px", maxWidth: "200px", overflowY: "auto" }}
        >
          <p className="text-gray-600 text-sm">Previous Searches:</p>
          <ul className="list-disc list-inside text-sm ml-2">
            {searchHistory.map((item, index) => (
              <li key={index} className="mt-1">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

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
    const history = localStorage.getItem("searchHistory");
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
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
    <div className="pt-20">
      <SearchBar
        onSearch={handleSearch}
        searchHistory={searchHistory}
        setSearchHistory={setSearchHistory}
      />

      <h1 className="text-3xl font-bold font-mono mb-4">Recipes</h1>
      <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {recipes.map((recipe, index) => (
          <Link href={`/${encodeURIComponent(recipe.title)}`} key={index}>
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
              description={recipe.description}
            />
          </Link>
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