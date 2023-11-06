import React, { useEffect, useState ,useContext } from "react";
import fetchRecipes from "@/helpers/hook";
import RecipeCard from "../Cards/RecipeCard";
import Hero from "../Landing/hero";
import LoadMoreButton from "../Buttons/LoadMore/LoadMore";
import Loading from "../Loading/Loading";
import FloatingButton from "../Buttons/floatingButton/FloatingButton";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "@/helpers/settings/settings";
import useSWR,{mutate} from "swr";
// const ITEMS_PER_PAGE = 100;

function RecipeList({favorites}) {
 const [recipes, setRecipes] = useState([]);
 const [originalRecipes, setOriginalRecipes] = useState([]);
 const [currentPage, setCurrentPage] = useState(1);
 const [totalRecipes, setTotalRecipes] = useState(0);
 const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);
 const [searchResults, setSearchResults] = useState([]);
 const [filterResults, setFilterCategoryResults] = useState([]);
 const [filterTagsResults, setFilterTagsResults] = useState([]);
 const [searchQuery, setSearchQuery] = useState("");

const { data: recipesData, error: recipesError,loading: isLoading } = useSWR(
  `/api/recipes?page=${currentPage}`,
  fetchRecipes
);

  useEffect(() => {
  if (!isLoading && recipesData) {
    // Check if recipesData is defined before updating the state
    setOriginalRecipes(recipesData.recipes);
    setTotalRecipes(recipesData.totalRecipes);
    // Use mutate to update the state as soon as you fetch the new data
    mutate(`/api/recipes?page=${currentPage}`);
  }
}, [currentPage, recipesData]);
  
  let combinedResults;


 const handleLoadLess = () => {
   setCurrentPage(currentPage - 1);

  //  loadRecipes(currentPage - 1);
 };
  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1);

    // loadRecipes(currentPage + 1);
  };

  

  if (isLoading) {
    return <Loading />;
  }
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



  if (
    searchResults.length < 1 &&
    filterResults.length < 1 &&
    filterTagsResults.length < 1
  ) {
    combinedResults = [...originalRecipes];
  } else {
    combinedResults = [
      ...searchResults,
      ...filterResults,
      ...filterTagsResults,
    ];
  }

  const remainingRecipes = totalRecipes - 100 * currentPage;

  return (
    <div>
      <Hero
        setFilterCategoryResults={setFilterCategoryResults}
        setFilterTagsResults={setFilterTagsResults}
        handleDefaultCategoryFilter={handleDefaultCategoryFilter}
        handleDefaultTagFilter={handleDefaultTagsFilter}
        handleDefaultSearch={handleDefaultSearch}
        setRecipes={setRecipes}
        onSearch={handleSearch}
        onAutocomplete={fetchAutocompleteSuggestions}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <button onClick={handleDefaultSearch}>All Recipes</button>
      {!favorites ? (
        <p>
          <Loading />
        </p>
      ) : favorites.length === 0 ? (
        <p>No favorite recipes yet.</p>
      ) : (
        <div className={`h-3/5`}>
          <Carousel responsive={responsive} containerClass="carousel-container">
            {favorites.map((recipe) => (
              <div key={recipe.recipe._id}>
                <RecipeCard recipe={recipe.recipe} favorites={favorites} />
              </div>
            ))}
          </Carousel>
        </div>
      )}
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
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {combinedResults.map((recipe, index) => (
            <div key={index}>
              <RecipeCard
                key={recipe._id}
                favorites={favorites}
                recipe={recipe}
                searchQuery={searchQuery}
                description={recipe.description}
              />
            </div>
          ))}
        </div>
      )}
      {combinedResults.length < totalRecipes && (
        <>
          <div className="flex justify-center gap-10">
            <LoadMoreButton
              handleLoad={handleLoadLess}
              remainingRecipes={remainingRecipes}
              totalRecipes={totalRecipes}
              isLoadMore={false}
            />
            <LoadMoreButton
              handleLoad={handleLoadMore}
              remainingRecipes={remainingRecipes}
              totalRecipes={totalRecipes}
              isLoadMore={true}
            />
          </div>
          <FloatingButton />
        </>
      )}
    </div>
  );
}

export default RecipeList;
