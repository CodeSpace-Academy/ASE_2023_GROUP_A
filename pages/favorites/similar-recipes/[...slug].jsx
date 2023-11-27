/* eslint-disable jsx-a11y/label-has-associated-control */
/**
 * SimilarRecipes component displays a list of recipes similar to the specified one.
 * @component
 * @returns {JSX.Element} - Rendered SimilarRecipes component.
 */
import React, {
  useEffect,
  useState,
  useContext,
  useMemo,
} from "react";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";
import Fuse from "fuse.js";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import useSimilarRecipesPageContext from "../../../components/Context/CurrentPageContexts/CurrentSimilarRecipesPage.jsx";
import FavoritesContext from "../../../components/Context/Favorites-context";
import RecipeCard from "../../../components/Cards/RecipeCard";
import Loading from "../../../components/Loading/Loading";

import Tags from "../../../components/Tags/Tags";
import Categories from "../../../components/Categories/Categories.jsx";
import FloatingButton from "../../../components/Buttons/FloatingButton/FloatingButton";

function SimilarRecipes() {
  const router = useRouter();
  const { slug } = router.query;
  const {
    currentSimilarRecipesPage,
    setSimilarRecipesCurrentPage,
  } = useSimilarRecipesPageContext();
  const [originalRecipes, setOriginalRecipes] = useState([]); // New state for original recipes
  const [similarRecipes, setSimilarRecipes] = useState([]);
  // const [fuse, setFuse] = useState(null);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const favoriteContext = useContext(FavoritesContext);
  const [sortOrder, setSortOrder] = useState("default");
  console.log("CURRENT PAGE:", currentSimilarRecipesPage);
  const fetcher = (url) => fetch(url).then((res) => res.json());
  // Use the useSWR hook to fetch data for the user's favorite recipes
  const {
    data: favoritesData,
    isLoading,
    error,
  } = useSWR("/api/recipes/Favourites", fetcher);

  /**
   * A function to manually refresh the favorites data.
   * It triggers a revalidation of the 'favorites' data using the mutate function.
   */
  const refreshFavorites = async () => {
    await mutate("/api/recipes/Favourites");
  };

  // Set up an event listener for changes in favorite recipes

  const recipeTitle = Array.isArray(slug) ? slug[0] : slug;

  /**
   * Function to search and fetch similar recipes based on the specified criteria.
   * @async
   * @function
   * @returns {Promise<void>} - Resolves when the similar recipes are fetched and updated.
   */
  const searchSimilarRecipes = async () => {
    try {
      const response = await fetch(
        `/api/search/similarRecipes/searchSimilarRecipesMongo?recipeTitle=${recipeTitle}&searchQuery=${searchQuery}&page=${currentSimilarRecipesPage}&tag=${selectedTags.join(
          ",",
        )}&category=${selectedCategories.join(",")}&sortOrder=${sortOrder}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setSimilarRecipes(data.similarRecipes);
      setTotalRecipes(data.totalSimilarRecipes);
    } catch (err) {
      console.error("Error fetching recipes:", err);
    }
  };

  // Function to fetch original recipes
  const fetchOriginalRecipes = async () => {
    try {
      const response = await fetch(
        `/api/search/similarRecipes/searchSimilarRecipesMongo?recipeTitle=${recipeTitle}&page=${currentSimilarRecipesPage}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setOriginalRecipes(data.similarRecipes);
      setTotalRecipes(data.totalSimilarRecipes);
      // await mutate("/api/recipes/Favourites")
    } catch (err) {
      console.error("Error fetching original recipes:", err);
    }
  };
  // useEffect(() => {
  //   if (favoritesData) {
  //     favoriteContext.updateFavorites(favoritesData.favorites || []);
  //   }
  //   favoriteContext.addChangeListener(refreshFavorites);
  //   return () => favoriteContext.removeChangeListener(refreshFavorites);
  // }, [favoriteContext.userFavorites]); // empty dependency array to run only once

  useEffect(() => {
    // Fetch the original recipes without search when the component mounts
    fetchOriginalRecipes();

    // Update the favorites in the context when the component mounts
    if (favoritesData) {
      favoriteContext.updateFavorites(favoritesData.favorites || []);
    }

    // Add the change listener for future updates
    favoriteContext.addChangeListener(refreshFavorites);

    // Cleanup: Remove the change listener when the component unmounts
    return () => favoriteContext.removeChangeListener(refreshFavorites);
  }, [recipeTitle, currentSimilarRecipesPage]);

  // useEffect(() => {
  //   // Update the favorites in the context when favoritesData changes
  //   if (favoritesData) {
  //     favoriteContext.updateFavorites(favoritesData.favorites || []);
  //   }
  // }, [favoritesData]);

  const fuse = useMemo(() => {
    if (originalRecipes.length > 0) {
      const options = {
        keys: ["title", "description", "tags", "ingredients"],
        includeMatches: true,
        threshold: 0.3,
      };
      return new Fuse(originalRecipes, options);
    }
    return null;
  }, [originalRecipes]);

  useEffect(() => {
    // Perform fuzzy search when searchQuery changes
    if (
      (fuse && searchQuery.length >= 4)
      || selectedTags
      || selectedCategories
      || sortOrder
    ) {
      // If searchQuery is not sufficient for fuzzy search, reset to original recipes
      searchSimilarRecipes();
    } else {
      setSimilarRecipes(originalRecipes);
    }
  }, [
    searchQuery,
    fuse,
    originalRecipes,
    selectedTags,
    selectedCategories,
    sortOrder,
  ]);
  /**
   * Function to handle page change in the pagination component.
   * @param {object} event - The event object.
   * @param {number} page - The selected page number.
   * @returns {void}
   */
  const handlePageChange = (event, page) => {
    setSimilarRecipesCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = () => {
    // Trigger the search when the search button is clicked
    searchSimilarRecipes();
  };

  const pageNumbers = Math.ceil((totalRecipes || 0) / 100);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error fetching favorites</p>;
  }

  // Extract the list of favorite recipes from the fetched data
  const favorites = favoritesData ? favoritesData.favorites || [] : [];

  // Rest of your code...

  return (
    <div className="pt-12">
      <h2>
        Similar Recipes For:
        <span>{slug}</span>
      </h2>
      <input
        id="searchBar"
        type="text"
        placeholder="Search for recipes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button htmlFor="searchBar" type="button" onClick={handleSearch}>
        Search
      </button>
      <Tags setSelectedTags={setSelectedTags} selectedTags={selectedTags} />
      <Categories
        setSelectedCategories={setSelectedCategories}
        selectedCategories={selectedCategories}
      />
      <label htmlFor="sortOrder">Sort Order:</label>
      <select
        id="sortOrder"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="default">Default</option>
        <option value="A-Z">Alphabetical (A-Z)</option>
        <option value="Z-A">Alphabetical (Z-A)</option>
        <option value="Oldest">Oldest</option>
        <option value="Recent">Recent</option>
        <option value="cooktime(asc)">Cook Time (Ascending)</option>
        <option value="cooktime(desc)">Cook Time (Descending)</option>
        <option value="preptime(asc)">Prep Time (Ascending)</option>
        <option value="preptime(desc)">Prep Time (Descending)</option>
        <option value="steps(asc)">Steps (Ascending)</option>
        <option value="steps(desc)">Steps (Descending)</option>
      </select>

      {similarRecipes === null ? (
        <p>No similar recipes found.</p>
      ) : (
        <div className="">
          {similarRecipes.length === 0 ? (
            <Loading />
          ) : (
            <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {similarRecipes.map((recipe, index) => (
                <RecipeCard
                  Key={recipe._id + index}
                  recipe={recipe}
                  favorites={favorites}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <div className="flex justify-center pb-8 gap-10">
        <Stack spacing={2} justifyContent="center" alignItems="center">
          <Pagination
            count={pageNumbers}
            page={currentSimilarRecipesPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Stack>
      </div>
      <FloatingButton />
    </div>
  );
}

export default SimilarRecipes;
