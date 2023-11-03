import React, { useEffect, useState,useContext } from "react";
import fetchRecipes from "@/helpers/hook";
import RecipeCard from "../Cards/RecipeCard";
import Hero from "../Landing/hero";
import LoadMoreButton from "../Buttons/LoadMore/LoadMore";
import FavoritesContext from "../Context/Favorites-context";
import Loading from "../Loading/Loading";

// const ITEMS_PER_PAGE = 100;

function RecipeList() {

  const [recipes, setRecipes] = useState([]);
  const [originalRecipes, setOriginalRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([])
  const [searchResults, setSearchResults] = useState([]);
  const [filterResults, setFilterResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const favoritesContext = useContext(FavoritesContext);
  const favorites = favoritesContext.favorites || [];


  const loadRecipes = async (page) => {

    const response = await fetchRecipes(page);

    if (response.ok) {

      const data = await response.json();
      // setRecipes([...recipes, ...data.recipes]);
      setOriginalRecipes(data.recipes);
      setTotalRecipes(data.totalRecipes);

    } else {

      console.error("Failed to fetch recipes");

    }

  };


  const handleLoadMore = () => {
    
    setCurrentPage(currentPage + 1);
   
    loadRecipes(currentPage + 1);

  };

  useEffect(() => {

    loadRecipes(currentPage);
  setLoading(false);
  }, [currentPage]);

  if (loading) {
    return <Loading />;
  }
  const handleSearch = async (searchQuery) => {

    if (!searchQuery) {

      
      handleDefaultSearch()

    } else {

      try {

        const response = await fetch("/api/search", {

          method: "POST",
          headers: {

            "Content-Type": "application/json",

          },
          body: JSON.stringify({ searchQuery }),

        });

        if (response.ok) {

          const searchResult = await response.json();
          
          // setCount(searchResult.recipes.length)
          setSearchResults(searchResult.recipes);

        } else {

          console.error("Search request failed");

        }

      } catch (error) {

        console.error("Error searching recipes:", error);

      }

    }

  };

  const fetchAutocompleteSuggestions = async (searchQuery) => {

    try {

      if (searchQuery.length === 0) {
        
        setAutocompleteSuggestions([]);

      } else {

        const response = await fetch(`/api/autocomplete?searchQuery=${searchQuery}`);

        if (response.ok) {

          const data = await response.json();
          setAutocompleteSuggestions(data.autocomplete);

        } else {

          console.error("Autocomplete request failed");

        }

      }

    } catch (error) {

      console.error("Error fetching autocomplete suggestions:", error);

    }

  };

  function handleDefaultSearch(){

    setSearchResults([]);
    setAutocompleteSuggestions([]);

  };

  function handleDefaultFilter(){
   
    setFilterResults([]);
    
  };

  let combinedResults 

  if(searchResults.length <1 && filterResults.length <1){

    combinedResults = [...originalRecipes];

  }else{

    combinedResults = [...searchResults, ...filterResults];

  }
  

  const remainingRecipes = totalRecipes - combinedResults.length;

  return (
    <div>
      <Hero
        setFilterResults={setFilterResults}
        handleDefaultFilter={handleDefaultFilter}
        handleDefaultSearch={handleDefaultSearch}
        setRecipes={setRecipes}
        onSearch={handleSearch}
        onAutocomplete={fetchAutocompleteSuggestions}
      />

      <button onClick={handleDefaultSearch}>All Recipes</button>

      <div className="total-count">Total Recipes: {combinedResults.length}</div>

      {autocompleteSuggestions.length > 0 && (
        <ul className="autocomplete-list">
          {autocompleteSuggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleAutocompleteSelect(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}

      <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {combinedResults.map((recipe, index) => (
          <div key={index}>
            <RecipeCard
              key={recipe._id}
              favorites={favorites}
              recipe={recipe}
              description={recipe.description}
            />
          </div>
        ))}
      </div>

      {combinedResults.length < totalRecipes && (
        <div className="flex justify-center">
          <LoadMoreButton
            handleLoadMore={handleLoadMore}
            remainingRecipes={remainingRecipes}
          />
        </div>
      )}
    </div>
  );

}

export default RecipeList;

