/* eslint-disable no-unused-vars */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/**
 * SimilarRecipes component displays a list of recipes similar to the specified one.
 * @component
 * @returns {JSX.Element} - Rendered SimilarRecipes component.
 */
import React, {
  useEffect, useState, useCallback, useMemo,
} from "react";
import { useRouter } from "next/router";
import Fuse from "fuse.js";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { v4 as KeyUUID } from "uuid";
import useSimilarRecipesPageContext from "../../../components/Context/CurrentPageContexts/CurrentSimilarRecipesPage.jsx";
import RecipeCard from "../../../components/Cards/RecipeCard";
import Loading from "../../../components/Loading/Loading";
import Tags from "../../../components/Tags/Tags.jsx";
import Categories from "../../../components/Categories/Categories.jsx";
import FloatingButton from "../../../components/Buttons/FloatingButton/FloatingButton";

function SimilarRecipes() {
  const router = useRouter();
  const { slug } = router.query;
  const { currentSimilarRecipesPage, updatePageNumber } = useSimilarRecipesPageContext();
  const [filteredPage, setFilteredPage] = useState(1);
  const [similarRecipes, setSimilarRecipes] = useState([]);
  // const [fuse, setFuse] = useState(null);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  // const favoriteContext = useContext(FavoritesContext);
  const [sortOrder, setSortOrder] = useState("default");

  const filtersExist = searchQuery
    || selectedTags
    || selectedCategories
    || sortOrder !== "default";

  const pageToUse = filtersExist ? filteredPage : currentSimilarRecipesPage;
  /**
   * A function to manually refresh the favorites data.
   * It triggers a revalidation of the 'favorites' data using the mutate function.
   */

  const recipeTitle = Array.isArray(slug) ? slug[0] : slug;

  /**
   * Function to search and fetch similar recipes based on the specified criteria.
   * @async
   * @function
   * @returns {Promise<void>} - Resolves when the similar recipes are fetched and updated.
   */
  const searchSimilarRecipes = async (page) => {
    updatePageNumber(page);
    try {
      const response = await fetch(
        `/api/search/searchSimilarRecipesMongo?recipeTitle=${recipeTitle}&searchQuery=${searchQuery}&page=${page}&tag=${selectedTags.join(
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
  const fuse = useMemo(() => {
    if (similarRecipes.length > 0) {
      const options = {
        keys: ["title", "description", "tags", "ingredients"],
        includeMatches: true,
        threshold: 0.3,
      };
      return new Fuse(similarRecipes, options);
    }
    return null;
  }, [similarRecipes]);

  useEffect(() => {
    if (selectedTags.length > 0 || selectedCategories.length > 0) {
      searchSimilarRecipes(filteredPage);
    }
    searchSimilarRecipes(currentSimilarRecipesPage);
    console.log("Filtered Page:", filteredPage);
    console.log("UnFiltered Current Page:", currentSimilarRecipesPage);
  }, [
    searchQuery,
    selectedTags,
    selectedCategories,
    sortOrder,
    currentSimilarRecipesPage,
    filteredPage,
    filtersExist,
  ]);

  /**
   * Function to handle page change in the pagination component.
   * @param {object} event - The event object.
   * @param {number} page - The selected page number.
   * @returns {void}
   */
  const handlePageChange = useCallback(
    (event, page) => {
      if (filtersExist) {
        setFilteredPage(page);
        // searchSimilarRecipes(pageToUse); // Use pageToUse consistently
      } else {
        updatePageNumber(page);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [
      currentSimilarRecipesPage,
      filteredPage,
    ],
  );

  const handleSearch = () => {
    // Trigger the search when the search button is clicked
    searchSimilarRecipes(filteredPage);
  };

  const pageNumbers = Math.ceil((totalRecipes || 0) / 100);

  // Extract the list of favorite recipes from the fetched data
  // const favorites = favoritesData ? favoritesData.favorites || [] : [];

  // Rest of your code...

  return (
    <div className="pt-20">
      <div className="flex space-x-4 p-4 bg-gray-100 rounded-md font-dm_mono shadow-md">
        <input
          id="searchBar"
          type="text"
          placeholder="Search for recipes..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          htmlFor="searchBar"
          type="button"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          onClick={handleSearch}
        >
          Search
        </button>
        <Tags
          Key={KeyUUID()}
          setSelectedTags={setSelectedTags}
          selectedTags={selectedTags}
        />
        <Categories
          Key={KeyUUID()}
          setSelectedCategories={setSelectedCategories}
          selectedCategories={selectedCategories}
        />
        <label htmlFor="sortOrder" className="flex items-center">
          Sort Order:
        </label>
        <select
          id="sortOrder"
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
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
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-fastHand mb-4">
          Similar Recipes For:
          <span className="font-bold underline font-deliciouse text-blue-black-10">
            {slug}
          </span>
        </h2>
      </div>

      {similarRecipes === null ? (
        <p>No similar recipes found.</p>
      ) : (
        <div className="">
          {similarRecipes.length === 0 ? (
            <Loading />
          ) : (
            <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {similarRecipes.map((recipe) => (
                <RecipeCard Key={KeyUUID()} recipe={recipe} />
              ))}
            </div>
          )}
        </div>
      )}

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
      <FloatingButton />
    </div>
  );
}

export default SimilarRecipes;
