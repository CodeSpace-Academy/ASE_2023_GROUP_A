/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-no-duplicate-props */
import {
  useContext,
  useEffect,
  useState,
  useMemo
} from 'react';

import Link from 'next/link';
import useSWR, { mutate } from 'swr';
import Fuse from "fuse.js";
import RecipeCard from '../../components/Cards/RecipeCard';
import FavoritesContext from '../../components/Context/Favorites-context';
import Loading from '../../components/Loading/Loading';

function FavoritesPage() {
  const favoriteCtx = useContext(FavoritesContext);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [sortOrderTitle, setSortOrderTitle] = useState("asc");
  const [sortOrderPrepTime, setSortOrderPrepTime] = useState("asc");
  const [sortOrderCookTime, setSortOrderCookTime] = useState("asc");
  const [sortOrderTotalTime, setSortOrderTotalTime] = useState("asc");
  const [sortOrderSteps, setSortOrderSteps] = useState("asc");
  const [sortOrder, setSortOrder] = useState("default");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  // const [, setFuse] = useState(null); // State to hold the Fuse instance
console.log("SEARCH TERM:", searchTerm)

  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data: favoritesData, error: recipesError } = useSWR(
    "/api/recipes/Favourites",
    fetcher
  );

  const favoriteRecipes = favoriteCtx.favorites || [];

  useEffect(() => {
    if (favoriteRecipes.length > 0) {
      setFilteredRecipes([...favoriteRecipes].flat());
      // setFuse(new Fuse([...favoriteRecipes].flat(), options));
      setIsLoading(false);
    } else if (favoritesData) {
      // Assuming favoritesData is an array of recipes
      favoriteCtx.updateFavorites(favoritesData.favorites);
      // Use updateFavorites instead of addFavorite
      // setFuse(new Fuse(favoritesData.favorites.flat(), options));
      setIsLoading(false);
    }
    if (recipesError) {
      alert("Error fetching Favorites:", recipesError.json());
    }
  }, [favoriteRecipes, favoritesData]);

  const sortAndFilterHandler = (sortType) => {
    let sortOrder;
    switch (sortType) {
      case "title":
        sortOrder = sortOrderTitle === "asc" ? 1 : -1;
        setSortOrderTitle((prev) => (prev === "asc" ? "desc" : "asc"));
        break;
      case "prepTime":
        sortOrder = sortOrderPrepTime === "asc" ? 1 : -1;
        setSortOrderPrepTime((prev) => (prev === "asc" ? "desc" : "asc"));
        break;
      case "cookTime":
        sortOrder = sortOrderCookTime === "asc" ? 1 : -1;
        setSortOrderCookTime((prev) => (prev === "asc" ? "desc" : "asc"));
        break;
      case "totalTime":
        sortOrder = sortOrderTotalTime === "asc" ? 1 : -1;
        setSortOrderTotalTime((prev) => (prev === "asc" ? "desc" : "asc"));
        break;
      case "steps":
        sortOrder = sortOrderSteps === "asc" ? 1 : -1;
        setSortOrderSteps((prev) => (prev === "asc" ? "desc" : "asc"));
        break;
      case "default":
        setFilteredRecipes([...favoriteRecipes].flat());
        break;
    }

    const sortedRecipes = [...filteredRecipes].sort((a, b) => {
      if (sortType === "title") {
        return sortOrder * a.recipe.title.localeCompare(b.recipe.title);
      } else if (sortType === "prepTime") {
        return sortOrder * (a.recipe.prep - b.recipe.prep);
      } else if (sortType === "cookTime") {
        return sortOrder * (a.recipe.cook - b.recipe.cook);
      } else if (sortType === "steps") {
        return sortOrder * (a.recipe.instructions.length - b.recipe.instructions.length);
      } else if (sortType === "totalTime") {
        const aTotalTime = a.recipe.prep + a.recipe.cook;
        const bTotalTime = b.recipe.prep + b.recipe.cook;
        return sortOrder * (aTotalTime - bTotalTime);
      }
      return 0; // Default case
    });

    setFilteredRecipes(sortedRecipes);
  };
  useEffect(() => {
    // Handle sorting based on the selected option
    switch (sortOrder) {
      case "A-Z":
        sortAndFilterHandler("title");
        break;
      case "Z-A":
        sortAndFilterHandler("title");
        break;
      case "Oldest":
        sortAndFilterHandler("totalTime");
        break;
      case "Recent":
        sortAndFilterHandler("totalTime");
        break;
      case "cooktime(asc)":
        sortAndFilterHandler("cookTime");
        break;
      case "cooktime(desc)":
        sortAndFilterHandler("cookTime");
        break;
      case "preptime(asc)":
        sortAndFilterHandler("prepTime");
        break;
      case "preptime(desc)":
        sortAndFilterHandler("prepTime");
        break;
      case "steps(asc)":
        sortAndFilterHandler("steps");
        break;
      case "steps(desc)":
        sortAndFilterHandler("steps");
        break;
      case "default":
        // Reset filtered recipes to the original state
        sortAndFilterHandler("default");
        break
    }


  }, [sortOrder]);
    const fuse = useMemo(() => {
      if (favoriteRecipes.length > 0) {
        const options = {
          keys: [
            "recipe.title",
            "recipe.description",
            "recipe.tags",
            "recipe.ingredients",
          ],
          includeMatches: true,
          threshold: 0.3,
        };
        return new Fuse(favoriteRecipes, options);
      }
      return null;
    }, [favoriteRecipes]);
  

console.log("SEARCH FUSE:", fuse);
  const searchResults = searchTerm ? fuse.search(searchTerm) : filteredRecipes;

const handleSearch = (event) => {
  const searchTerm = event.target.value;

  setSearchTerm(searchTerm);

  if (searchTerm === "") {
    setIsLoading(true);

    // Reset filtered recipes to favorites when the search term is empty
    setFilteredRecipes(favoriteRecipes);
    setIsLoading(false);
    return;
  }

  // Perform the search using Fuse
  const searchResults = fuse.search(searchTerm);

  // Update the filtered recipes state with the search results
  setFilteredRecipes(searchResults.map((result) => result.item));

  setIsLoading(false);
};

  return (
    <section>
      <strong>
        <h1 className="py-10 px-5 mx-20 my-10">My Favorites</h1>
      </strong>
      <section className="mx-5">
        {/* Add sorting options here */}
        <div>
          <input
            type="text"
            placeholder="Search recipes"
            value={searchTerm}
            onChange={handleSearch}
            className="px-4 py-2 border border-gray-300 rounded mb-4"
          />
          <div>
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
          </div>
        </div>

        {isLoading ? (
          <Loading />
        ) : filteredRecipes.length === 0 ? (
          <img src="../Images/nix.png" alt="No Likes" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRecipes.map((result, index) => (
              <RecipeCard
                key={index}
                recipe={result.recipe}
                favorites={favoriteRecipes}
                searchQuery={searchTerm}
              />
            ))}
            {/* If there are search results, render them as well */}
          </div>
        )}

        <Link href="/" className="py-10 px-5 mx-12">
          <strong> Explore Recipes</strong>
        </Link>
      </section>
    </section>
  );
}

export default FavoritesPage;
