/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-nested-ternary */
import React, {
  useEffect,
  useState,
  useCallback,
  useContext,
} from "react";
import { useRouter } from "next/router";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Fuse from "fuse.js";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { v4 as KeyUUID } from "uuid"; // Import mutate for manual revalidation
import RecipeCard from "../Cards/RecipeCard";
import FavCard from "../Cards/FavCard";
import Hero from "../Landing/Hero";
import FloatingButton from "../Buttons/FloatingButton/FloatingButton";
import Badges from "../Badges/Badges";
import Loading from "../Loading/Loading";
import { usePageContext } from "../Context/CurrentPageContexts/CurrentHomePage";
import FavoritesContext from "../Context/Favorites-context";
import { useTheme } from "../Context/ThemeContext";
import { responsive } from "../../helpers/settings/settings";

function RecipeList() {
  const STORAGE_KEY = "recipeListState"; // Define a key for localStorage
  const isServer = typeof window === "undefined";
  // Retrieve state from localStorage or use default values
  const initialState = JSON.parse(isServer ? null : localStorage.getItem(STORAGE_KEY)) || {
    searchQuery: "",
    selectedCategories: [],
    selectedIngredients: [],
    selectedTags: [],
    selectedInstructions: null,
    sortOrder: null,
  };
  const router = useRouter();
  const {
    tags,
    ingredients,
    categories,
    instructions,
    sortOrders,
    searchQuery: urlSearchQuery,
  } = router.query;
  const [recipes, setRecipes] = useState([]);
  const { currentPage, updatePage } = usePageContext();
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [filteredPage, setFilteredPage] = useState(1);
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState(
    urlSearchQuery || initialState.searchQuery,
  );
  const [selectedCategories, setSelectedCategories] = useState(
    categories ? categories.split(",") : initialState.selectedCategories,
  );
  const [selectedIngredients, setSelectedIngredients] = useState(
    ingredients ? ingredients.split(",") : initialState.selectedIngredients,
  );
  const [selectedTags, setSelectedTags] = useState(
    tags ? tags.split(",") : initialState.selectedTags,
  );
  const [selectedInstructions, setSelectedInstructions] = useState(
    instructions
      ? parseInt(instructions, 10)
      : initialState.selectedInstructions,
  );
  const [sortOrder, setSortOrder] = useState(
    sortOrders || initialState.sortOrder,
  );
  const [noRecipesFoundMessage, setNoRecipesFoundMessage] = useState(false);
  const [filterCount, setFilterCount] = useState(0);
  const [showCarousel, setShowCarousel] = useState(false);// Add loading state
  const favoriteCtx = useContext(FavoritesContext);
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  const filters = {
    searchQuery,
    tags: selectedTags,
    ingredients: selectedIngredients,
    categories: selectedCategories,
    instructions: parseInt(selectedInstructions, 10),
  };
  const filtersExist = (
    selectedTags.length > 0
    || selectedIngredients.length > 0
    || selectedCategories.length > 0
    || selectedInstructions
    || sortOrder
    || searchQuery.length > 0
  );

  const pageToUse = filtersExist ? filteredPage : currentPage;

  const fetchData = async (url, options = {}) => {
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
    } catch (err) {
      throw new Error("Error fetching data:", err);
    }
  };
  const fuse = () => {
    if (searchQuery.length >= 4) {
      const options = {
        keys: ["title", "description", "tags", "ingredients"],
        includeMatches: true,
        threshold: 0.3,
      };
      return new Fuse(recipes, options);
    }
    return null;
  };

  const fetchOriginalAndFilteredData = async () => {
    try {
      // For searching with Fuse.js
      if (fuse() && searchQuery.length >= 4) {
        const results = fuse().search(searchQuery);
        const searchedRecipes = results.map((result) => result.item);
        setRecipes(searchedRecipes);
        setTotalRecipes(searchedRecipes.length);
        setNoRecipesFoundMessage(searchedRecipes.length === 0);
      } else {
        // For filtering without searching
        const originalData = await fetchData(
          `/api/recipes?page=${pageToUse}&filters=${JSON.stringify(filters)}&sortOrder=${sortOrder}`,
        );
        setRecipes(originalData.recipes);
        setTotalRecipes(originalData.totalCount);
        setNoRecipesFoundMessage(originalData.recipes.length === 0);
      }
    } catch (err) {
      return err;
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
    fetchOriginalAndFilteredData();
    const stateToSave = {
      searchQuery,
      selectedCategories,
      selectedIngredients,
      selectedTags,
      selectedInstructions,
      sortOrder,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  }, [
    searchQuery,
    selectedTags,
    selectedIngredients,
    selectedCategories,
    selectedInstructions,
    sortOrder,
    currentPage,
    filteredPage,
  ]);

  const handlePageChange = useCallback(
    (event, page) => {
      if (filtersExist) {
        setFilteredPage(page);
      } else {
        updatePage(page);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [
      pageToUse,
      filtersExist,
    ],
  );

  const pageNumbers = Math.ceil((totalRecipes || 0) / 100);

  const displayRemainingRecipes = `Displaying ${
    recipes && recipes.length > 100 ? 100 : (recipes ? recipes.length : 0)
  } recipes of ${totalRecipes}`;

  const fetchAutocompleteSuggestions = async (searchInput) => {
    try {
      if (searchInput.length === 0 || !fuse) {
        setAutocompleteSuggestions([]);
      } else {
        const results = fuse.search(searchInput);
        const suggestions = results.map((result) => result.item.title);
        setAutocompleteSuggestions(suggestions);
      }
    } catch (err) {
      throw new Error("Error:", err);
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
      fetchOriginalAndFilteredData();
    }
  };

  const handleChange = (event) => {
    setSelectedInstructions(event.target.value);
  };
  const handleViewFavorites = () => {
    setShowCarousel(!showCarousel);
  };
  // const remainingRecipes = totalRecipes - 100 * currentPage;
  const favorites = favoriteCtx.favorites || [];

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
        selectedCategories={selectedCategories}
        selectedIngredients={selectedIngredients}
        selectedTags={selectedTags}
        filterCount={filterCount}
        setFilterCount={setFilterCount}
        selectedInstructions={selectedInstructions}
      />

      <div className="my-8">
        <div className="flex w-full justify-center">
          <button
            type="button"
            onClick={handleViewFavorites}
            className={`${
                  theme === "light" ? " bg-blue-500 text-black" : "text-white bg-gray-700"
                } hover:bg-gray-700 hover:text-white px-4 py-2 text-lg font-medium rounded-md`}
          >
            {showCarousel ? "Hide Favourites" : "View Favourites"}
          </button>
        </div>

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
              <div className="mt-6 ">
                <Carousel
                  responsive={responsive}
                  containerClass="carousel-container"
                  className="gap-2 m-3 bg-[linear-gradient(180deg,transparent,#38487875,transparent)]"
                >
                  {favorites.map((recipe) => (
                    <div key={recipe.recipe._id} className="gap-12 m-3">
                      <FavCard recipe={recipe.recipe} favorites={favorites} />
                    </div>
                  ))}
                </Carousel>
              </div>
            )}
          </div>
        )}
      </div>
      {autocompleteSuggestions.map((suggestion) => (
        <li key={KeyUUID()}>
          <button
            type="button"
            onClick={() => fetchAutocompleteSuggestions(suggestion)}
          >
            {suggestion}
          </button>
        </li>
      ))}

      <div>
        {noRecipesFoundMessage && (
          <h1 className="text-2xl font-bold mb-4 text-center text-red-500">
            No Recipes Found for `
            {selectedInstructions > 0
              ? "Specified number of steps"
              : searchQuery.length > 0
                ? searchQuery
                : "chosen filters"}
            `
          </h1>
        )}
        {recipes && recipes.length === 0 && totalRecipes === 0 ? (
          <Loading />
        ) : (
          <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {recipes
              && recipes.map((recipe) => (
                <div key={KeyUUID()}>
                  <RecipeCard
                    key={recipe._id}
                    recipe={recipe}
                    searchQuery={searchQuery}
                    description={recipe.description}
                  />
                </div>
              ))}
          </div>
        )}
      </div>
      <p style={{ textAlign: "center" }}>
        <span style={{ fontWeight: "bold" }}>
          {displayRemainingRecipes}
        </span>
        recipes remaining
      </p>
      <div className="flex justify-center pb-8 gap-10">
        <Stack spacing={2} justifyContent="center" alignItems="center">
          <Pagination
            count={pageNumbers}
            page={pageToUse}
            onChange={handlePageChange}
            color="primary"
          />
        </Stack>
      </div>
      <FloatingButton
        className={theme === "light" ? "bg-blue-500" : "bg-blue-800"}
      />
    </div>
  );
}

export default RecipeList;
