// Filename: pages/similar-recipes/[...slug].js
import { useEffect, useState, useContext } from "react";
import useSWR, { mutate } from "swr";
import RecipeCard from "../../../components/cards/RecipeCard";
import { useRouter } from "next/router";
import FavoritesContext from "../../../components/Context/Favorites-context";
import Fuse from "fuse.js";
import { useSimilarRecipesPageContext } from "@/components/Context/currentPageContexts/currentSimilarRecipesPage copy";
import fetchRecipes from "../../../helpers/hook";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const SimilarRecipes = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { currentSimilarRecipesPage, setSimilarRecipesCurrentPage } = useSimilarRecipesPageContext();
  const [similarRecipes, setSimilarRecipes] = useState([]);
  const [fuse, setFuse] = useState(null);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
const favoriteCtx = useContext(FavoritesContext)
  const favorites = favoriteCtx.favorites || [];

  const fetcher = (url) => fetch(url).then((res) => res.json());

  // Use the useSWR hook to fetch data for the user's favorite recipes
  const { data: favoritesData, error } = useSWR(
    "api/recipes/Favourites",
    fetcher
  );

  console.log("Favorites From Similar Recipes Page", favoriteCtx);
        const recipeTitle = Array.isArray(slug) ? slug[0] : slug;
  useEffect(() => {
    if (slug) {
      // console.log("Similar Recipes For recipeTitle", recipeTitle);

      // Fetch similar recipes when the component mounts
      const fetchSimilarRecipes = async () => {
        try {
          const response = await fetch(
            `/api/search/similarRecipes?recipeTitle=${recipeTitle}&page=${currentSimilarRecipesPage}`
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

      fetchSimilarRecipes();
    }
  }, [slug, currentSimilarRecipesPage]);
  
useEffect(() => {
  // Initialize Fuse with your recipe data
  const options = {
    keys: ["title", "description", "tags", "ingredients"],
    includeMatches: true,
    threshold: 0.3,
  };
  setFuse(new Fuse(similarRecipes, options));
}, [similarRecipes]);

 useEffect(() => {
   // Perform fuzzy search when searchQuery changes
   if (fuse && searchQuery.length >= 4) {
     const results = fuse.search(searchQuery);
     const fuzzyRecipes = results.map((result) => result.item);
     setSimilarRecipes(fuzzyRecipes);
   }
 }, [searchQuery, fuse]);
  
    const handlePageChange = (event, page) => {
      setSimilarRecipesCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  console.log("Similar Recipes For Slug:", slug, "are:", similarRecipes);

  
  const pageNumbers = Math.ceil((totalRecipes || 0) / 100);
  
  return (
    <div className="p-30">
      <h2>
        Similar Recipes For:<span> {slug}</span>
      </h2>
      <input
        type="text"
        placeholder="Search for recipes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className={`flex`}>
        {similarRecipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            isFavorite={favoriteCtx.recipeIsFavorite(recipe._id)}
          />
        ))}
      </div>
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
