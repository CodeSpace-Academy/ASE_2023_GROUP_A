/* eslint-disable */
import { useEffect, useState, useContext } from "react";
import useSWR, { mutate } from "swr";
import Carousel from "react-multi-carousel";
import fetchRecipes from "@/helpers/hook";
import RecipeCard from "../Cards/RecipeCard";
import Hero from "../Landing/hero";
import LoadMoreButton from "../Buttons/LoadMore/LoadMore";
import Loading from "../Loading/Loading";
import FloatingButton from "../Buttons/floatingButton/FloatingButton";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "@/helpers/settings/settings";

import FavoritesContext from "../Context/Favorites-context";
import { useTheme } from "@/components/Context/ThemeContext";

import Skeleton from "@mui/material/Skeleton";

import Badges from "../badges/badges";
import { eslint } from "@/next.config";

function RecipeList({ favorites }) {
  const [recipes, setRecipes] = useState([]);
  const [originalRecipes, setOriginalRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedInstructions, setSelectedInstructions] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [noRecipesFoundMessage, setNoRecipesFoundMessage] = useState(null);
  const favoriteContext = useContext(FavoritesContext);
  const [filterCount, setFilterCount] = useState(0);
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  const {
    data: recipesData,
    error: recipesError,
    isLoading: isLoading,
  } = useSWR(`/api/recipes?page=${currentPage}`, fetchRecipes);

  useEffect(() => {
    favoriteContext.updateFavorites(favorites);
    if (!isLoading && recipesData) {
      // Check if recipesData is defined before updating the state
      setRecipes(recipesData.recipes);
      setTotalRecipes(recipesData.totalRecipes);
      // Use mutate to update the state as soon as you fetch the new data
      mutate(`/api/recipes?page=${currentPage}`);
    }
  }, [currentPage, recipesData, favorites]);

  const handleLoadLess = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  function countAppliedFilters(
    selectedCategories,
    selectedIngredients,
    selectedTags,
    selectedInstructions
  ) {
    let count = 0;

    if (selectedCategories.length > 0) {
      count++;
    }

    if (selectedIngredients.length > 0) {
      count++;
    }

    if (selectedTags.length > 0) {
      count++;
    }

    if (selectedInstructions > 0) {
      count++;
    }

    return count;
  }

  useEffect(() => {
    const counts = countAppliedFilters(
      selectedCategories,
      selectedIngredients,
      selectedTags,
      selectedInstructions
    );
    setFilterCount(counts);
  }, [
    selectedTags,
    selectedIngredients,
    selectedCategories,
    selectedInstructions,
  ]);

  const fetchRecipesByFilters = async (filters) => {
    try {
      const response = await fetch(`/api/combined`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filters,
        }),
      });

      if (response.ok) {
        const result = await response.json();

        if ("recipes" in result) {
          setRecipes(result.recipes);

          if (result.recipes.length === 0) {
            setNoRecipesFoundMessage(
              `No Recipes Found for ${
                searchQuery.length > 0 ? searchQuery : "chosen filters"
              }`
            );
          } else {
            setNoRecipesFoundMessage(null);
          }
        } else {
          console.error("No recipes found in the response data.");
        }
      } else {
        console.error("Failed to fetch recipes by filters");
      }
    } catch (error) {
      console.error("Error fetching recipes by filters:", error);
    }
  };

  useEffect(() => {
    let typingTimeout;

    if (
      searchQuery.length <= 4 ||
      selectedTags.length > 0 ||
      selectedIngredients.length > 0 ||
      selectedCategories.length > 0 ||
      selectedInstructions
    ) {
      clearTimeout(typingTimeout);

      typingTimeout = setTimeout(() => {
        const filters = {
          tags: selectedTags,
          searchQuery,
          ingredients: selectedIngredients,
          categories: selectedCategories,
          instructions: parseInt(selectedInstructions),
        };
        fetchRecipesByFilters(filters);
      }, 500);
    }

    return () => {
      clearTimeout(typingTimeout);
    };
  }, [
    searchQuery,
    selectedTags,
    selectedIngredients,
    selectedCategories,
    selectedInstructions,
  ]);

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
    setSelectedInstructions(null);
    setAutocompleteSuggestions([]);
    setFilterCount(0);
  }

  const handleSearchButton = () => {
    if (searchQuery.length >= 4) {
      const filters = {
        searchQuery,
        tags: selectedTags,
        ingredients: selectedIngredients,
        categories: selectedCategories,
        instructions: parseInt(selectedInstructions),
      };
      fetchRecipesByFilters(filters);
    }
  };

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

  function handleChange(event) {
    setSelectedInstructions(event.target.value);
  }

  const remainingRecipes = totalRecipes - 100 * currentPage;

  return (
    <div>
      <Hero
        setSelectedCategories={setSelectedCategories}
        selectedCategories={selectedCategories}
        selectedIngredients={selectedIngredients}
        setSelectedIngredients={setSelectedIngredients}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        selectedInstructions={selectedInstructions}
        setSelectedInstructions={setSelectedInstructions}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleDefaultSearch={handleDefaultSearch}
        onSearch={handleSearchButton}
        onAutocomplete={fetchAutocompleteSuggestions}
        handleChange={handleChange}
        handleSort={handleSort}
      />

      <Badges
        numberOfRecipes={recipes.length}
        handleDefault={handleDefault}
        filterCount={filterCount}
      />

      {/* {!favorites ? (
        <p>
          <Loading />
        </p>
      ) : favorites.length === 0 ? (
        <p className={isDarkTheme ? "text-white" : ""}>
          No favorite recipes yet.
        </p>
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
      )} */}

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

      {noRecipesFoundMessage !=null ? (
       
        <p style={{fontWeight: 'bold', fontSize: '2em', textAlign: 'center'}}>{noRecipesFoundMessage}</p>
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
      {!(filterCount != 0 || recipes.length == 0) && (
        <>
          <p style={{ textAlign: "center" }}>
            <span style={{ fontWeight: "bold" }}>{remainingRecipes} </span>
            recipes remaining
          </p>
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
