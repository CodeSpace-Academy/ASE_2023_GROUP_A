import React, { useEffect, useState } from "react";
import fetchRecipes from "@/helpers/hook";
import RecipeCard from "../Cards/RecipeCard";
import Hero from "../Landing/hero";
import LoadButton from "../Buttons/LoadMore/LoadMore";
import FloatingButton from "../Buttons/floatingButton/floatingButton";
import Skeleton from "@mui/material/Skeleton";
import Badge from "@mui/material/Badge";
import { FaTrash } from "react-icons/fa";

function RecipeList() {
  const [originalRecipes, setOriginalRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [filterResults, setFilterCategoryResults] = useState([]);
  const [filterTagsResults, setFilterTagsResults] = useState([]);
  const [filterIngredientResults, setFilterIngredientResults] = useState([]);
  const [filterInstructionsResults, setFilterInstructionsResults] = useState(
    []
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedInstructions, setSelectedInstructions] = useState(0);
  const [sortOrder, setSortOrder] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [noRecipesFoundMessage, setNoRecipesFoundMessage] = useState(null);
  const [numberOfFilters, setNumberOfFilters] = useState(0);

  const loadRecipes = async (page) => {
    setLoading(true);
    const response = await fetchRecipes(page);

    if (response.ok) {
      const data = await response.json();

      setOriginalRecipes(data.recipes);
      setTotalRecipes(data.totalRecipes);
      setLoading(false);
      setNumberOfFilters("0");
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

            console.log(filterInstructionsResults);
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
        onSearch={handleSearch}
        onAutocomplete={fetchAutocompleteSuggestions}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSort={handleSort}
      />

      <div className="flex">
        <input
          type="number"
          placeholder="Enter number of instructions..."
          value={parseInt(selectedInstructions)}
          onChange={handleChange}
          className="border border-gray-300 rounded-l-md px-4 py-2"
        />

        <Badge
          badgeContent={numberOfFilters}
          color="primary"
          style={{ margin: "auto", fontWeight: "bold", zIndex: "-1" }}
        >
          FILTERS
        </Badge>

        <button onClick={handleDefault}>
          <span style={{ display: "inline-flex", gap: "0.2em" }}>
            Filters
            <FaTrash style={{ color: "blue", opacity: "0.5" }} />
          </span>
        </button>

        <Badge
          badgeContent={recipes.length}
          color="primary"
          style={{ margin: "auto", fontWeight: "bold", zIndex: "-1" }}
        >
          Recipes
        </Badge>
      </div>

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

      {loading ? (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {[1, 2, 3, 4].map((index) => (
            <div key={index} style={{ width: 300, margin: "auto" }}>
              <Skeleton animation="wave" variant="rect" height={300} />
              <Skeleton animation="wave" height={20} />
              <Skeleton animation="wave" height={20} />
            </div>
          ))}
        </div>
      ) : recipes.length < 1 ? (
        <p style={{ textAlign: "center", fontSize: "5em", fontWeight: "bold" }}>
          {noRecipesFoundMessage}
        </p>
      ) : (
        <>
          <div className="container m-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recipes.map((recipe, index) => (
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

          {!(
            searchResults.length > 0 ||
            filterResults.length > 0 ||
            filterTagsResults.length > 0 ||
            filterInstructionsResults.length > 0
          ) && (
            <>
              <p style={{ textAlign: "center" }}>
                <span style={{ fontWeight: "bold" }}>{remainingRecipes} </span>
                recipes remaining
              </p>
              <div className="flex justify-center gap-10">
                <LoadButton
                  handleLoad={handleLoadLess}
                  remainingRecipes={remainingRecipes}
                  totalRecipes={totalRecipes}
                  isLoadMore={false}
                  currentPage
                />
                <LoadButton
                  handleLoad={handleLoadMore}
                  remainingRecipes={remainingRecipes}
                  totalRecipes={totalRecipes}
                  isLoadMore={true}
                  currentPage
                />
              </div>
            </>
          )}
          <FloatingButton />
        </>
      )}
    </div>
  );
}

export default RecipeList;
