import { useEffect, useState } from "react";
import fetchRecipes from "@/helpers/hook";
import RecipeCard from "../Cards/RecipeCard";
import Hero from "../Landing/hero";
import LoadMoreButton from "../Buttons/LoadMore/LoadMore";
import Loading from "../Loading/Loading";
import FloatingButton from "../Buttons/floatingButton/FloatingButton";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "@/helpers/settings/settings";
import useSWR, { mutate } from "swr";
// const ITEMS_PER_PAGE = 100;

function RecipeList({ favorites }) {
  const [recipes, setRecipes] = useState([]);
  const [originalRecipes, setOriginalRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [filterResults, setFilterCategoryResults] = useState([]);
  const [filterTagsResults, setFilterTagsResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [numberOfFilters, setNumberOfFilters] = useState(0);
  const [filterIngredientResults, setFilterIngredientResults] = useState([]);
  const [filterInstructionsResults, setFilterInstructionsResults] = useState(
    []
  );

  // const [loading, setLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedInstructions, setSelectedInstructions] = useState(0);
  const [sortOrder, setSortOrder] = useState(null);

  const [noRecipesFoundMessage, setNoRecipesFoundMessage] = useState(null);
  // const [numberOfFilters, setNumberOfFilters] = useState(0);

  const {
    data: recipesData,
    error: recipesError,
    loading: isLoading,
  } = useSWR(`/api/recipes?page=${currentPage}`, fetchRecipes);

  useEffect(() => {
    if (!isLoading && recipesData) {
      // Check if recipesData is defined before updating the state
      setOriginalRecipes(recipesData.recipes);
      setTotalRecipes(recipesData.totalRecipes);
      // Use mutate to update the state as soon as you fetch the new data
      mutate(`/api/recipes?page=${currentPage}`);
    }
  }, [currentPage, recipesData]);

  // let combinedResults;

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
    setNoRecipesFoundMessage("");

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
          if (searchResult.recipes.length === 0) {
            setTimeout(() => {
              setNoRecipesFoundMessage(`No Recipes Found for ${searchQuery}`);
            }, 900);
          } else {
            setTimeout(() => {
              setNoRecipesFoundMessage("No recipes found");
            }, 1100);
          }

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
    setSearchQuery("");
    setAutocompleteSuggestions([]);
  }

  function handleDefault() {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedIngredients([]);
    setSelectedTags([]);
    setSelectedInstructions(0);
    setAutocompleteSuggestions([]);
    setCurrentPage(1);
    setNumberOfFilters("0");
  }

  function handleDefaultCategoryFilter() {
    setFilterCategoryResults([]);
  }

  function handleDefaultIngredientFilter() {
    setFilterIngredientResults([]);
  }

  function handleDefaultTagsFilter() {
    setFilterTagsResults([]);
  }

  useEffect(() => {
    const fetchRecipesByInstructions = async (selectedInstructions) => {
      if (
        parseInt(selectedInstructions) == "" ||
        parseInt(selectedInstructions) < 0
      ) {
        setFilterCategoryResults([]);
      } else {
        try {
          const response = await fetch(`/api/filterbyinstructions`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              selectedInstructions: parseInt(selectedInstructions),
            }),
          });

          if (response.ok) {
            const filterInstructionsResults = await response.json();
            setFilterInstructionsResults(filterInstructionsResults.recipes);
          } else {
            console.error("Failed to fetch recipes by instruction");
          }
        } catch (error) {
          console.error("Error fetching recipes by instruction:", error);
        }
      }
    };

    if (selectedInstructions != "") {
      fetchRecipesByInstructions(selectedInstructions);
    } else {
      setFilterInstructionsResults([]);
    }
  }, [selectedInstructions]);

  const handleSort = (sortOrder) => {
    setSortOrder(sortOrder);

    if (sortOrder === "[A-Z]") {
      setRecipes([...recipes].sort((a, b) => a.title.localeCompare(b.title)));
    } else if (sortOrder === "[Z-A]") {
      setRecipes([...recipes].sort((a, b) => b.title.localeCompare(a.title)));
    } else if (sortOrder === "Oldest") {
      setRecipes(
        [...recipes].sort((a, b) => a.published.localeCompare(b.published))
      );
    } else if (sortOrder === "Recent") {
      setRecipes(
        [...recipes].sort((a, b) => b.published.localeCompare(a.published))
      );
    } else if (sortOrder === "cooktime(asc)") {
      setRecipes([...recipes].sort((a, b) => a.cook - b.cook));
    } else if (sortOrder === "cooktime(desc)") {
      setRecipes([...recipes].sort((a, b) => b.cook - a.cook));
    } else if (sortOrder === "steps(asc)") {
      setRecipes(
        [...recipes].sort(
          (a, b) => a.instructions.length - b.instructions.length
        )
      );
    } else if (sortOrder == "preptime(asc)") {
      setRecipes([...recipes].sort((a, b) => a.prep - b.prep));
    } else if (sortOrder == "preptime(desc)") {
      setRecipes([...recipes].sort((a, b) => b.prep - a.prep));
    } else if (sortOrder === "steps(desc)") {
      setRecipes(
        [...recipes].sort(
          (a, b) => b.instructions.length - a.instructions.length
        )
      );
    } else {
      setRecipes([...recipes]);
    }
  };

  useEffect(() => {
    const fetchRecipesByInstructions = async (selectedInstructions) => {
      if (
        parseInt(selectedInstructions) == "" ||
        parseInt(selectedInstructions) < 0
      ) {
        setFilterCategoryResults([]);
      } else {
        try {
          const response = await fetch(`/api/filterbyinstructions`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              selectedInstructions: parseInt(selectedInstructions),
            }),
          });

          if (response.ok) {
            const filterInstructionsResults = await response.json();
            setFilterInstructionsResults(filterInstructionsResults.recipes);
          } else {
            console.error("Failed to fetch recipes by instruction");
          }
        } catch (error) {
          console.error("Error fetching recipes by instruction:", error);
        }
      }
    };

    if (selectedInstructions != "") {
      fetchRecipesByInstructions(selectedInstructions);
    } else {
      setFilterInstructionsResults([]);
    }
  }, [selectedInstructions]);

  function handleChange(event) {
    setSelectedInstructions(event.target.value);
  }

  function handleNumberOfFilters() {
    let num;
    if (filterResults > 0) {
      num = +1;
    } else {
      num = num;
    }

    if (filterIngredientResults > 0) {
      num = +1;
    } else {
      num = num;
    }

    if (filterInstructionsResults) {
      num = +1;
    } else {
      num = num;
    }

    if (filterTagsResults > 0) {
      num = +1;
    } else {
      num = num;
    }

    setNumberOfFilters(parseInt(num));
  }

  useEffect(() => {
    handleNumberOfFilters();
  }, [
    filterResults,
    filterTagsResults,
    filterIngredientResults,
    filterInstructionsResults,
  ]);

  useEffect(() => {
    let combinedResults = [];

    if (searchQuery.length === 0) {
      combinedResults = [...originalRecipes];
    } else {
      combinedResults = [...searchResults];
    }

    if (selectedCategories.length > 0) {
      combinedResults = [...searchResults, ...filterResults];
    }

    if (selectedTags.length > 0) {
      combinedResults = [
        ...searchResults,
        ...filterResults,
        ...filterTagsResults,
      ];
    }

    if (selectedIngredients.length > 0) {
      combinedResults = [
        ...searchResults,
        ...filterResults,
        ...filterTagsResults,
        ...filterIngredientResults,
      ];
    }

    if (selectedInstructions != 0 && selectedInstructions >= 0) {
      combinedResults = [
        ...searchResults,
        ...filterResults,
        ...filterTagsResults,
        ...filterIngredientResults,
        ...filterInstructionsResults,
      ];
    }

    setRecipes(combinedResults);
  }, [
    searchQuery,
    selectedCategories,
    selectedTags,
    selectedIngredients,
    selectedInstructions,
    searchResults,
    filterResults,
    filterTagsResults,
    filterIngredientResults,
    filterInstructionsResults,
    originalRecipes,
  ]);

  const remainingRecipes = totalRecipes - 100 * currentPage;

  return (
    <div>
      <Hero
        setSelectedCategories={setSelectedCategories}
        selectedCategories={selectedCategories}
        setFilterCategoryResults={setFilterCategoryResults}
        handleDefaultCategoryFilter={handleDefaultCategoryFilter}
        selectedIngredients={selectedIngredients}
        setFilterIngredientResults={setFilterIngredientResults}
        handleDefaultIngredientFilter={handleDefaultIngredientFilter}
        setSelectedIngredients={setSelectedIngredients}
        setFilterTagsResults={setFilterTagsResults}
        handleDefaultTagFilter={handleDefaultTagsFilter}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        handleDefaultSearch={handleDefaultSearch}
        setRecipes={setRecipes}
        onSearch={handleSearch}
        onAutocomplete={fetchAutocompleteSuggestions}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSort={handleSort}
      />
      <button onClick={handleDefault}>All Recipes</button>

      <div style={{ textAlign: "center" }}>
        <p>Filter by number of instructions:</p>
        <input
          type="number"
          placeholder="Enter number of instructions.."
          value={parseInt(selectedInstructions)}
          onChange={handleChange}
          className="border border-gray-300 rounded-1-md px-4 py-2"
        />
      </div>
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
      <div className="total-count">Total Recipes: {recipes.length}</div>

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
          {recipes.map((recipe, index) => (
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
      {recipes.length < totalRecipes && (
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
