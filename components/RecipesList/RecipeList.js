import React, { useEffect, useState, useContext } from "react";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Carousel from "react-multi-carousel";
import fetchRecipes from "../../helpers/hook";
import RecipeCard from "../Cards/RecipeCard";
import Hero from "../Landing/hero";
import FloatingButton from "../Buttons/floatingButton/floatingButton";
import "react-multi-carousel/lib/styles.css";
import FavoritesContext from "../Context/Favorites-context";
import { useTheme } from "../Context/ThemeContext";
import Badges from "../badges/badges";
import { responsive } from "../../helpers/settings/settings";
import Loading from "../Loading/Loading";

/**
 * RecipeList component to display a list of recipes based on various filters.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object[]} props.favorites - List of favorite recipes.
 * @returns {JSX.Element} - Rendered component.
 */

function RecipeList({ favorites }) {
  const [recipes, setRecipes] = useState([]);
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
  const [filterCount, setFilterCount] = useState(0);
  const favoriteContext = useContext(FavoritesContext);
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";
  const router = useRouter();

  const {
    data: recipesData,
    error: recipesError,
    isLoading,
  } = useSWR(`/api/recipes?page=${currentPage}`, fetchRecipes);

  if (recipesError) {
    throw Error;
  }

  const pageNumbers = Math.ceil((totalRecipes || 0) / 100);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    favoriteContext.updateFavorites(favorites);
    if (!isLoading && recipesData) {
      setRecipes(recipesData.recipes);
      setTotalRecipes(recipesData.totalRecipes);
      mutate(`/api/recipes?page=${currentPage}`);
    }
  }, [currentPage, favorites, isLoading, recipesData]);

  function countAppliedFilters(
    selectedCategories,
    selectedIngredients,
    selectedTags,
    selectedInstructions,
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
      selectedInstructions,
    );
    setFilterCount(counts);
  }, [
    selectedTags,
    selectedIngredients,
    selectedCategories,
    selectedInstructions,
  ]);

  const fetchRecipesByFilters = async (filters, sortOrder) => {
    try {
      const response = await fetch(`/api/combined`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filters,
          sortOrder,
        }),
      });

      if (response.ok) {
        const result = await response.json();

        if ("recipes" in result) {
          setRecipes(result.recipes);

          if (result.recipes.length === 0) {
            setNoRecipesFoundMessage(
              `No Recipes Found for ${
                selectedInstructions > 0
                  ? "Specified number of steps"
                  : searchQuery.length > 0
                    ? searchQuery
                    : "chosen filters"
              }`,
            );
          } else {
            setNoRecipesFoundMessage(null);
          }
        } else {
          throw Error;
        }
      } else {
        throw Error;
      }

      const queryParams = new URLSearchParams(filters);

      if (searchQuery.length > 0) {
        queryParams.set("searchQuery", searchQuery);
      } else {
        queryParams.delete("searchQuery");
      }

      if (selectedTags.length > 0) {
        queryParams.set("tags", selectedTags.join(","));
      } else {
        queryParams.delete("tags");
      }

      if (selectedCategories.length > 0) {
        queryParams.set("categories", selectedCategories.join(","));
      } else {
        queryParams.delete("categories");
      }

      if (selectedIngredients.length > 0) {
        queryParams.set("ingredients", selectedIngredients.join(","));
      } else {
        queryParams.delete("ingredients");
      }

      if (selectedInstructions) {
        queryParams.set("instructions", selectedInstructions.toString());
      } else {
        queryParams.delete("instructions");
      }

      if (sortOrder) {
        queryParams.set("sortOrders", sortOrder);
      } else {
        queryParams.delete("sortOrders");
      }

      const queryString = queryParams.toString();
      const url = queryString ? `/?${queryString}` : "/";

      router.push(url);
    } catch (error) {
      throw Error;
    }
  };

  useEffect(() => {
    const {
      page,
      tags,
      ingredients,
      categories,
      instructions,
      searchQuery,
      sortOrders,
    } = router.query;

    setCurrentPage(page || 1);
    setSelectedTags(tags ? tags.split(",") : []);
    setSelectedIngredients(ingredients ? ingredients.split(",") : []);
    setSelectedCategories(categories ? categories.split(",") : []);
    setSelectedInstructions(instructions ? parseInt(instructions, 10) : null);
    setSearchQuery(searchQuery || "");
    setSortOrder(sortOrders || null);
  }, []);

  useEffect(() => {
    let typingTimeout;

    if (
      searchQuery.length <= 4
      || selectedTags.length > 0
      || selectedIngredients.length > 0
      || selectedCategories.length > 0
      || selectedInstructions
    ) {
      clearTimeout(typingTimeout);

      typingTimeout = setTimeout(() => {
        const filters = {
          tags: selectedTags,
          searchQuery,
          ingredients: selectedIngredients,
          categories: selectedCategories,
          instructions: parseInt(selectedInstructions, 10),
        };

        fetchRecipesByFilters(filters, sortOrder);
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
    sortOrder,
  ]);

  const fetchAutocompleteSuggestions = async (searchQuery) => {
    try {
      if (searchQuery.length === 0) {
        setAutocompleteSuggestions([]);
      } else {
        const response = await fetch(
          `/api/autocomplete?searchQuery=${searchQuery}`,
        );

        if (response.ok) {
          const data = await response.json();
          setAutocompleteSuggestions(data.autocomplete);
        } else {
          throw Error;
        }
      }
    } catch (error) {
      throw Error;
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
    setCurrentPage((prevPage) => prevPage);
    router.push("/");
  }

  const handleSearchButton = () => {
    if (searchQuery.length >= 4) {
      const filters = {
        searchQuery,
        tags: selectedTags,
        ingredients: selectedIngredients,
        categories: selectedCategories,
        instructions: parseInt(selectedInstructions, 10),
      };
      fetchRecipesByFilters(filters);
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
        setSortOrder={setSortOrder}
      />

      <Badges
        numberOfRecipes={recipes.length}
        handleDefault={handleDefault}
        filterCount={filterCount}
      />

      {isLoading ? (
        <Loading />
      ) : favorites.length === 0 ? (
        <p className={isDarkTheme ? "text-white" : ""}>
          All favorites will appear here
        </p>
      ) : (
        <div className="h-3/5">
          <Carousel responsive={responsive} containerClass="carousel-container">
            {favorites.map((recipe) => (
              <div key={recipe.recipe._id}>
                <RecipeCard recipe={recipe.recipe} favorites={favorites} />
              </div>
            ))}
          </Carousel>
        </div>
      )}

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

      {noRecipesFoundMessage !== null ? (
        <p
          style={{
            fontWeight: "bold",
            fontSize: "2em",
            textAlign: "center",
          }}
        >
          {noRecipesFoundMessage}
        </p>
      ) : (
        <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 gap-4">
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
      {(filterCount === 0 || recipes.length === 0) && (
        <>
          <p style={{ textAlign: "center" }}>
            <span style={{ fontWeight: "bold" }}>
              {remainingRecipes}
              {' '}
            </span>
            recipes remaining
          </p>

          <div className="flex justify-center pb-8 gap-10">
            <Stack spacing={2} justifyContent="center" alignItems="center">
              <Pagination
                count={pageNumbers}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </Stack>
          </div>
        </>
      )}
      <FloatingButton />
    </div>

  );
}

export default RecipeList;
