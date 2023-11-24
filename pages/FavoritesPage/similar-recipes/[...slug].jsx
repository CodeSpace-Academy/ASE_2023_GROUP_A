import { useEffect, useState, useContext } from "react";
import useSWR from "swr";
import RecipeCard from "../../../components/cards/RecipeCard";
import { useRouter } from "next/router";
import FavoritesContext from "../../../components/Context/Favorites-context";
import Fuse from "fuse.js";
import { useSimilarRecipesPageContext } from "@/components/Context/currentPageContexts/currentSimilarRecipesPage copy";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Loading from "@/components/Loading/Loading";
// ... (other imports)

const SimilarRecipes = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { currentSimilarRecipesPage, setSimilarRecipesCurrentPage } =
    useSimilarRecipesPageContext();
  const [originalRecipes, setOriginalRecipes] = useState([]); // New state for original recipes
  const [similarRecipes, setSimilarRecipes] = useState([]);
  const [fuse, setFuse] = useState(null);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const favoriteCtx = useContext(FavoritesContext);
  const favorites = favoriteCtx.favorites || [];

  const fetcher = (url) => fetch(url).then((res) => res.json());

  // Use the useSWR hook to fetch data for the user's favorite recipes
  const { data: favoritesData, error } = useSWR(
    "api/recipes/Favourites",
    fetcher
  );

  const recipeTitle = Array.isArray(slug) ? slug[0] : slug;

  // Function to search and fetch similar recipes
  const searchSimilarRecipes = async (searchQuery) => {
    try {
      const response = await fetch(
        `/api/search/similarRecipes/searchSimilarRecipesMongo?recipeTitle=${recipeTitle}&searchQuery=${searchQuery}&page=${currentSimilarRecipesPage}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setSimilarRecipes(data.similarRecipes);
      setTotalRecipes(data.totalSimilarRecipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  // Function to fetch original recipes
  const fetchOriginalRecipes = async () => {
    try {
      const response = await fetch(
        `/api/search/similarRecipes/searchSimilarRecipesMongo?recipeTitle=${recipeTitle}&page=${currentSimilarRecipesPage}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setOriginalRecipes(data.similarRecipes);
      setTotalRecipes(data.totalSimilarRecipes);
    } catch (error) {
      console.error("Error fetching original recipes:", error);
    }
  };

  useEffect(() => {
    // Fetch the original recipes without search when the component mounts
    fetchOriginalRecipes();
  }, [recipeTitle, currentSimilarRecipesPage]);

  useEffect(() => {
    // Initialize Fuse with your recipe data
    const options = {
      keys: ["title", "description", "tags", "ingredients"],
      includeMatches: true,
      threshold: 0.3,
    };
    setFuse(new Fuse(originalRecipes, options));
  }, [originalRecipes]);

  useEffect(() => {
    // Perform fuzzy search when searchQuery changes
    if (fuse && searchQuery.length >= 4) {
      // If searchQuery is not sufficient for fuzzy search, reset to original recipes
      searchSimilarRecipes(searchQuery);
    } else {
      setSimilarRecipes(originalRecipes);
    }
  }, [searchQuery, fuse, originalRecipes]);

  const handlePageChange = (event, page) => {
    setSimilarRecipesCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = () => {
    // Trigger the search when the search button is clicked
    searchSimilarRecipes(searchQuery);
  };

  const pageNumbers = Math.ceil((totalRecipes || 0) / 100);

  return (
    <div className="pt-12">
      <h2>
        Similar Recipes For:<span> {slug}</span>
      </h2>
      <input
        id="search"
        type="text"
        placeholder="Search for recipes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button htmlFor="search" type="button" onClick={handleSearch}>
        Search
      </button>

      {similarRecipes === null ? (
        <p>No similar recipes found.</p>
      ) : (
        <div className={``}>
         
          {similarRecipes.length === 0 ? (
            <Loading />
            ) : (
              <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {similarRecipes.map((recipe) => (
                    <RecipeCard
                      key={recipe._id}
                      recipe={recipe}
                      isFavorite={favoriteCtx.recipeIsFavorite(recipe._id)}
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
    </div>
  );
};

export default SimilarRecipes;
