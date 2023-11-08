import { useEffect, useState } from "react";
import fetchRecipes from "@/helpers/hook";
import RecipeCard from "../Cards/RecipeCard";
import Hero from "../Landing/hero";
import LoadButton from "../Buttons/LoadMore/LoadMore";
import FloatingButton from "../Buttons/floatingButton/floatingButton";

function RecipeList() {
  const [originalRecipes, setOriginalRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [filterResults, setFilterCategoryResults] = useState([]);
  const [filterTagsResults, setFilterTagsResults] = useState([]);
  const [filterIngridientsResults, setFilterIngridientsResults] = useState([])
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  


  const loadRecipes = async (page) => {
    const response = await fetchRecipes(page);

    if (response.ok) {
      const data = await response.json();

      setOriginalRecipes(data.recipes);
      setTotalRecipes(data.totalRecipes);
    } else {
      console.error("Failed to fetch recipes");
    }
  };

  const handleLoadLess = () => {
    setCurrentPage(currentPage - 1);

    loadRecipes(currentPage - 1);
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
      handleDefaultSearch();
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
        const response = await fetch(
          `/api/autocomplete?searchQuery=${searchQuery}`
        );

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

  function handleDefaultSearch() {
    setSearchResults([]);
    setAutocompleteSuggestions([]);
  }

  function handleDefaultCategoryFilter() {
    setFilterCategoryResults([]);
  }

  function handleDefaultTagsFilter() {
    setFilterTagsResults([]);
  }

  function handleDefaultIngridientFilter() {
    setFilterIngridientsResults([]);
  }


  const sortRecipesBySteps = (recipes, sortOrder) => {
    return [...recipes].sort((a, b) => {

      if (sortOrder === "asc") {
        return a.instructions.length - b.instructions.length;
      } else {
        return b.instructions.length - a.instructions.length;
      }
    });
  };

  let combinedResults;

  if (
    searchResults.length < 1 &&
    filterResults.length < 1 &&
    filterTagsResults.length < 1 &&
    filterIngridientsResults.length < 1
  ) {
    combinedResults = [...originalRecipes];
  } else {
    combinedResults = [
      ...searchResults,
      ...filterResults,
      ...filterTagsResults,
      ...filterIngridientsResults,
    ];
  }

// Sort the combinedResults based on the selected sorting order
 combinedResults = sortRecipesBySteps(combinedResults, sortOrder);

 


  const remainingRecipes = totalRecipes - 100 * currentPage;

  return (
    <div>
      <Hero
        setFilterCategoryResults={setFilterCategoryResults}
        setFilterTagsResults={setFilterTagsResults}
        setFilterIngridientsResults={setFilterIngridientsResults}
        handleDefaultCategoryFilter={handleDefaultCategoryFilter}
        handleDefaultTagFilter={handleDefaultTagsFilter}
        handleDefaultSearch={handleDefaultSearch}
        handleDefaultIngredientFilter={handleDefaultIngridientFilter}
        onSearch={handleSearch}
        onAutocomplete={fetchAutocompleteSuggestions}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
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

      
          {!combinedResults.length<1?
      <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {combinedResults.map((recipe, index) => (
          <div key={index}>
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
              searchQuery={searchQuery}
              description={recipe.description}
            />
          </div>
        ))}
      </div>
      :
      <p style={{textAlign: 'center', fontSize:'5em', fontWeight: 'bold' }}>Loading...</p>
          }
      <div className="flex justify-center gap-10">
        <LoadButton
          handleLoad={handleLoadLess}
          remainingRecipes={remainingRecipes}
          totalRecipes={totalRecipes}
          isLoadMore={false}
        />
        <LoadButton
          handleLoad={handleLoadMore}
          remainingRecipes={remainingRecipes}
          totalRecipes={totalRecipes}
          isLoadMore={true}
        />
      </div>

      <FloatingButton />
    </div>
  );
}

export default RecipeList;
