/* eslint-disable no-nested-ternary */
import React, {
  useEffect,
  useState,
  useContext,
  useMemo,
  useCallback,
} from "react";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { v4 as KeyUUID } from "uuid";
import Fuse from "fuse.js";

// import fetchRecipes from "../../helpers/hook";
import RecipeCard from "../Cards/RecipeCard";
import FavCard from "../Cards/FavCard";
import Hero from "../Landing/Hero";
import FloatingButton from "../Buttons/FloatingButton/FloatingButton";
import Badges from "../Badges/Badges";
import Loading from "../Loading/Loading";

import FavoritesContext from "../Context/Favorites-context";
import { usePageContext } from "../Context/CurrentPageContexts/CurrentHomePage";
import { useTheme } from "../Context/ThemeContext";

import { responsive } from "../../helpers/settings/settings";
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
  const { currentPage, updatePage, api } = usePageContext();
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedInstructions, setSelectedInstructions] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [fuse, setFuse] = useState(null);
  const [noRecipesFoundMessage, setNoRecipesFoundMessage] = useState(null);
  const [filterCount, setFilterCount] = useState(0);
  const [showCarousel, setShowCarousel] = useState(false);
  const favoriteContext = useContext(FavoritesContext);
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";
  const router = useRouter();

  // const {
  //   data: recipesData,
  //   error: recipesError,
  //   isLoading,
  // } = useSWR(`${api}`, fetchRecipes, {
  //   revalidateOnFocus: false, // Disable revalidation on focus to prevent unnecessary re-fetching
  // });

  // const { data, error, loading } = useSWR(`${api}`, fetchRecipes);

  // if (error) {
  //   return <h1>Error Failed to Fetch Recipes</h1>;
  // }
  const filters = {
    searchQuery,
    tags: selectedTags,
    ingredients: selectedIngredients,
    categories: selectedCategories,
    instructions: parseInt(selectedInstructions, 10),
  };
  const apiUrl = `${api}&filters=${JSON.stringify(
    filters
  )}&sortOrder=${sortOrder}`;
  console.log("API URL:", apiUrl);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setRecipes(data.recipes);
      setTotalRecipes(data.totalCount);
    } catch (err) {
      console.error("Error fetching original recipes:", err);
    }
  };
  const fetchFilteredRecipes = async () => {
    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setRecipes(data.recipes);
      setTotalRecipes(data.totalCount);
    } catch (err) {
      console.error("Error fetching original recipes:", err);
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
  };

  useEffect(() => {
    // Fetch the original recipes without search when the component mounts
    fetchRecipes();
  }, [currentPage]);

  useEffect(() => {
    let typingTimeout;

    if (
      searchQuery.length >= 4 ||
      selectedTags.length > 0 ||
      selectedIngredients.length > 0 ||
      selectedCategories.length > 0 ||
      selectedInstructions
    ) {
      clearTimeout(typingTimeout);

      typingTimeout = setTimeout(() => {
        fetchFilteredRecipes();
      }, 500);
    }

    return () => clearTimeout(typingTimeout);
  }, [
    searchQuery,
    selectedTags,
    selectedIngredients,
    selectedCategories,
    selectedInstructions,
    sortOrder,
  ]);


  useEffect(() => {
    updatePage(currentPage);
  }, [currentPage]);

  useEffect(() => {
    favoriteContext.updateFavorites(favorites);
  }, [favorites]);

  const pageNumbers = Math.ceil((totalRecipes || 0) / 100);

  const handlePageChange = useCallback(
    (event, page) => {
      updatePage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [updatePage]
  );

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
    // Check if selectedInstructions is not null before comparing
    if (selectedInstructions !== null && selectedInstructions > 0) {
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

  useEffect(() => {
    const {
      tags,
      ingredients,
      categories,
      instructions,
      searchQuery,
      sortOrders,
    } = router.query;
    // updatePage(currentPage);
    setSelectedTags(tags ? tags.split(",") : []);
    setSelectedIngredients(ingredients ? ingredients.split(",") : []);
    setSelectedCategories(categories ? categories.split(",") : []);
    setSelectedInstructions(instructions ? parseInt(instructions, 10) : null);
    setSearchQuery(searchQuery || "");
    setSortOrder(sortOrders || null);
  }, []);

  const fetchAutocompleteSuggestions = async (searchInput) => {
    try {
      if (searchInput.length === 0 || !fuse) {
        setAutocompleteSuggestions([]);
      } else {
        const results = fuse.search(searchInput);
        const suggestions = results.map((result) => result.item.title);
        setAutocompleteSuggestions(suggestions);
      }
    } catch (error) {
      console.error("Error:", error);
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
    updatePage(currentPage);
    router.push("/");
  }

  const handleSearchButton = () => {
    if (searchQuery.length >= 4) {
      fetchFilteredRecipes();
    }
  };

  const handleChange = (event) => {
    setSelectedInstructions(event.target.value);
  };
  const handleViewFavorites = () => {
    setShowCarousel(!showCarousel);
  };
  // const remainingRecipes = totalRecipes - 100 * currentPage;
  const recipesPerPage = 100;
  const displayRemainingRecipes = Math.max(
    0,
    totalRecipes - recipesPerPage * currentPage
  );
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
        numberOfRecipes={totalRecipes}
        handleDefault={handleDefault}
        filterCount={filterCount}
      />

      <div className="my-8">
        <button
          type="button"
          onClick={handleViewFavorites}
          className="bg-blue-500 px-4 py-2 rounded-md"
        >
          {showCarousel ? "Hide Favourites" : "view Favourites"}
        </button>

        {showCarousel && (
          <div>
            {!favorites ? (
              <p>
                <Loading />
              </p>
            ) : favorites.length === 0 ? (
              <p className={isDarkTheme ? "text-white" : "text-blue-black-10"}>
                No favorite recipes yet.
              </p>
            ) : (
              <div className="mt-4">
                <Carousel
                  responsive={responsive}
                  containerClass="carousel-container"
                >
                  {favorites.map((recipe) => (
                    <div key={recipe.recipe._id}>
                      <FavCard recipe={recipe.recipe} favorites={favorites} />
                    </div>
                  ))}
                </Carousel>
              </div>
            )}
          </div>
        )}
      </div>
      {autocompleteSuggestions.length > 0 && (
        <ul className="autocomplete-list">
          {autocompleteSuggestions.map((suggestion, index) => (
            <li key={`${index}:${suggestion}`}>
              <button
                type="button"
                onClick={() => handleAutocompleteSelect(suggestion)}
              >
                {suggestion}
              </button>
            </li>
          ))}
          {autocompleteSuggestions.map((suggestion, index) => (
            <li key={KeyUUID()}>
              <button
                type="button"
                onClick={() => handleAutocompleteSelect(suggestion)}
              >
                {suggestion}
              </button>
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
        <div>
          {totalRecipes === 0 ? (
            <Loading />
          ) : (
            <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {recipes.map((recipe) => (
                <div key={KeyUUID()}>
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
        </div>
      )}
      <>
        <p style={{ textAlign: "center" }}>
          <span style={{ fontWeight: "bold" }}>{displayRemainingRecipes} </span>
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
      <FloatingButton
        className={theme === "light" ? "bg-blue-500" : "bg-blue-800"}
      />
    </div>
  );
}

export default RecipeList;
