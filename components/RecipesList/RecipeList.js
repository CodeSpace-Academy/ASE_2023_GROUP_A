import React, { useEffect, useState } from "react";
import RecipeCard from "../Cards/RecipeCard";
import Link from "next/link";
import LoadMoreButton from "../Buttons/LoadMore";
import fetchRecipes from "@/helpers/hook";

export const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(""); // New state to track the selected history item
  const [searchHistoryVisible, setSearchHistoryVisible] = useState(false);

  useEffect(() => {
    const history = localStorage.getItem("searchHistory");
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  const clearSearch = () => {
    setSearchTerm("");
    setSearchHistoryVisible(false);
  
  };

  const handleSearchClick = () => {
    if (searchTerm) {
      onSearch(searchTerm);
      setSearchHistory((prevHistory) => {
        const updatedHistory = [searchTerm, ...prevHistory].slice(0, 5);
        localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
        return updatedHistory;
      });
      setSelectedHistoryItem(""); // Clear the selected history item
      setSearchTerm("");
      setSearchHistoryVisible(false);
      
    }
  };

  const handleHistoryItemClick = (item) => {
    setSelectedHistoryItem(item); // Set the selected history item in the state
    setSearchTerm(item); // Update the search bar with the clicked history item
  };

  return (
    <div className="absolute p-5 flex top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ zIndex: 1 }}>
      <div>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onClick={() => setSearchHistoryVisible(true)}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-2 py-2 border rounded-md border-gray-400 focus:outline-none focus:ring focus:border-blue-300 w-full max-w-xs"
        />
      </div>
      <div>
        <button
          className="ml-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          onClick={handleSearchClick}
        >
          Search
        </button>
      </div>
      <div>
        <button
          className="ml-2 bg-blue-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          onClick={clearSearch}
        >
          Clear
        </button>
      </div>
      {searchHistoryVisible && searchHistory.length > 0 && (
        <div className="bg-white p-1 border border-gray-300 rounded mt-1" style={{ maxHeight: "50px", maxWidth: "200px", overflowY: "auto" }}>
          <p className="text-gray-600 text-sm">Previous Searches:</p>
          <ul className="list-disc list-inside text-sm ml-2">
            {searchHistory.map((item, index) => (
              <span
                className={`text-blue-500 hover:underline ${selectedHistoryItem === item ? "font-bold" : ""}`}
                onClick={() => handleHistoryItemClick(item)}
                key={index}
              >
                <li key={index} className="mt-1">
                  {item}
                </li>
              </span>
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
        <SearchBar onSearch={handleSearch} />
      </div>

      <h1 className="text-3xl font-bold font-mono mb-4">Recipes</h1>
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