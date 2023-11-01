import React, { useEffect, useState } from "react";
import fetchRecipes from "@/helpers/hook";
import RecipeCard from "../Cards/RecipeCard";
import Hero from "../Landing/hero";
import LoadMoreButton from "../Buttons/LoadMore/LoadMore";

// const ITEMS_PER_PAGE = 100;

function RecipeList() {

  const [recipes, setRecipes] = useState([]);
  const [originalRecipes, setOriginalRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([])

  const loadRecipes = async (page) => {

    const response = await fetchRecipes(page);

    if (response.ok) {

      const data = await response.json();
      setRecipes([...recipes, ...data.recipes]);
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

  }, [currentPage]);




  const handleSearch = async (searchQuery) => {

    if (!searchQuery) {

      setRecipes(originalRecipes);
      setAutocompleteSuggestions([])

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
          setRecipes(searchResult.recipes);
          setCount(searchResult.recipes.length)

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

      const response = await fetch(`/api/autocomplete?searchQuery=${searchQuery}`);

      if (response.ok) {

        const data = await response.json();
        setAutocompleteSuggestions(data.autocomplete);

      } else {

        console.error("Autocomplete request failed");

      }

    } catch (error) {

      console.error("Error fetching autocomplete suggestions:", error);

    }
  };

  const handleDefault = () => {

    setRecipes(originalRecipes);
    setAutocompleteSuggestions([])

  }

  const remainingRecipes = totalRecipes - recipes.length;

  return (

    <div>

      <button onClick={handleDefault}>All Recipes</button>

      <Hero handleDefault={handleDefault} setRecipes={setRecipes} onSearch={handleSearch} onAutocomplete={fetchAutocompleteSuggestions} />

      {autocompleteSuggestions.length > 0 && (

      <ul className="autocomplete-list">

        {autocompleteSuggestions.map((suggestion, index) => (

          <li key={index} onClick={() => handleAutocompleteSelect(suggestion)}>

            {suggestion}

          </li>
          
        ))}

      </ul>

      )}

      <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        {recipes.map((recipe, index) => 

          <div key={index}>

            <RecipeCard key={recipe._id} recipe={recipe} description={recipe.description} />

          </div>

        )}

      </div>

      {recipes.length < totalRecipes && (

        <div className="flex justify-center">

          <LoadMoreButton handleLoadMore={handleLoadMore} remainingRecipes={remainingRecipes} />

        </div>

      )}

    </div>

  );

}

export default RecipeList;

