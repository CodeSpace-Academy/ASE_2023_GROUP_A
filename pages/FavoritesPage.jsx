/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-no-duplicate-props */
import {
  useContext,
  useEffect,
  useState,
} from 'react';

import Link from 'next/link';
import useSWR from 'swr';

import RecipeCard from '../components/Cards/RecipeCard';
import FavoritesContext from '../components/Context/Favorites-context';
import Loading from '../components/Loading/Loading';

function FavoritesPage() {
  const favoriteCtx = useContext(FavoritesContext);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [sortOrderTitle, setSortOrderTitle] = useState('asc');
  const [sortOrderPrepTime, setSortOrderPrepTime] = useState('asc');
  const [sortOrderCookTime, setSortOrderCookTime] = useState('asc');
  const [sortOrderTotalTime, setSortOrderTotalTime] = useState('asc');
  const [isLoading, setIsLoading] = useState(true);

  const fetcher = (url) => fetch(url).then((res) => res.json());

  const {
    data: favoritesData,
    error: recipesError,
  } = useSWR('api/recipes/Favourites', fetcher);

  const favoriteRecipes = favoriteCtx.favorites || [];
  useEffect(() => {
    if (favoriteRecipes.length > 0) {
      setFilteredRecipes([...favoriteRecipes].flat());
      setIsLoading(false);
    } else if (favoritesData) {
      // Assuming favoritesData is an array of recipes
      favoriteCtx.updateFavorites(favoritesData.favorites);
      // Use updateFavorites instead of addFavorite
      setIsLoading(false);
    }
    if(recipesError){
      alert( "Error fetching Favorites:", recipeError.json() )
    }
  }, [favoriteRecipes, favoritesData]);


  const sortAndFilterHandler = (sortType) => {
    let sortOrder;
    switch (sortType) {
      case 'title':
        sortOrder = sortOrderTitle === 'asc' ? 1 : -1;
        setSortOrderTitle((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        break;
      case 'prepTime':
        sortOrder = sortOrderPrepTime === 'asc' ? 1 : -1;
        setSortOrderPrepTime((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        break;
      case 'cookTime':
        sortOrder = sortOrderCookTime === 'asc' ? 1 : -1;
        setSortOrderCookTime((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        break;
      case 'totalTime':
        sortOrder = sortOrderTotalTime === 'asc' ? 1 : -1;
        setSortOrderTotalTime((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        break;
      default:
        sortOrder = 1;
    }


  const sortedRecipes = [...filteredRecipes].sort((a, b) => {
    if (sortType === 'title') {
      return sortOrder * a.recipe.title.localeCompare(b.recipe.title);
    } else if (sortType === 'prepTime') {
      return sortOrder * (a.recipe.prep - b.recipe.prep);
    } else if (sortType === 'cookTime') {
      return sortOrder * (a.recipe.cook - b.recipe.cook);
    } else if (sortType === 'totalTime') {
      const aTotalTime = a.recipe.prep + a.recipe.cook;
      const bTotalTime = b.recipe.prep + b.recipe.cook;
      return sortOrder * (aTotalTime - bTotalTime);
    }
    return 0; // Default case
  });

  setFilteredRecipes(sortedRecipes);
}
return (
  <section>
    <strong>
      <h1 className="py-10 px-5 mx-20 my-10">My Favorites</h1>
    </strong>
    <section className="mx-5">
      {/* Add sorting options here */}
      <div>
          <button
            type="button"
            onClick={() => sortAndFilterHandler('title')}
            className={`mr-2 ${sortOrderTitle === 'asc' ? 'bg-black text-white' : 'bg-white text-black'}`}
          >
            Sort Title {sortOrderTitle === 'asc' ? 'A-Z' : 'Z-A'}
          </button>
          <br />
          <button
            type="button"
            onClick={() => sortAndFilterHandler('prepTime')}
            className={`mr-2 ${sortOrderPrepTime === 'asc' ? 'bg-black text-white' : 'bg-white text-black'}`}
          >
            Sort Prep Time {sortOrderPrepTime === 'asc' ? 'Ascending' : 'Descending'}
          </button>
          <br />
          <button
            type="button"
            onClick={() => sortAndFilterHandler('cookTime')}
            className={`mr-2 ${sortOrderCookTime === 'asc' ? 'bg-black text-white' : 'bg-white text-black'}`}
          >
            Sort Cook Time {sortOrderCookTime === 'asc' ? 'Ascending' : 'Descending'}
          </button>
          <br />
          <button
            type="button"
            onClick={() => sortAndFilterHandler('totalTime')}
            className={`mr-2 ${sortOrderTotalTime === 'asc' ? 'bg-black text-white' : 'bg-white text-black'}`}
          >
            Sort Total Time {sortOrderTotalTime === 'asc' ? 'Ascending' : 'Descending'}
          </button>
        </div>

      {isLoading ? (
        <Loading />
      ) : filteredRecipes.length === 0 ? (
        <img src="../Images/nix.png" alt="No Likes" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.recipe._id}
              recipe={recipe.recipe}
              favorites={favoriteRecipes}
            />
          ))}
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
