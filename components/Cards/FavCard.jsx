import React, { useContext } from 'react';

import Image from 'next/legacy/image';
import { toast } from 'react-toastify';

import {
  StarIcon as StarEmpty,
  StarIcon as StarFilled,
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import FavoritesContext from '../Context/Favorites-context';
import { useTheme } from '../Context/ThemeContext';

const FavCard = ({ recipe, favorites }) => {
  const favoriteCtx = useContext(FavoritesContext);
  const { theme } = useTheme()
  const recipeIsFavorite = favoriteCtx.recipeIsFavorite(recipe._id, favorites);

  const removeFavoriteHandler = async () => {
    const userConfirmed = window.confirm('Are you sure you want to remove this recipe from your favorites?');
    if (userConfirmed) {
      try {
        const response = await fetch(`api/recipes/Favourites`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ recipeId: recipe._id }),
        });

        if (response.ok) {
          favoriteCtx.removeFavorite(recipe._id);
          toast.success('Recipe removed from favorites!');
        }
      } catch (error) {
        console.error('Error removing favorite:', error);
        toast.error('Error removing recipe from favorites.');
      }
    }
  };

  const firstImage = recipe.images && recipe.images.length > 0 ? recipe.images[0] : null;

  return (
    <>
    <div className={`${ theme === "dark" ?"text-custom-color-mixed-20":"text-blue-black-10"} bg-blue-400 rounded-lg shadow-lg overflow-hidden`}>
      <div className="relative h-40 overflow-hidden">
        {firstImage ? (
          <Image src={firstImage} alt={recipe.title} layout="fill" objectFit="cover" className="rounded-t-lg" />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-300 text-gray-600">No Image</div>
        )}
      </div>
      <div className={`flex flex-col justify-between h-16 p-4`}>
        <div className="text-center">
          <h3 className="text-lg font-semibold">{recipe.title}</h3>
        </div>
        <div className="flex items-center justify-end">
          {recipeIsFavorite ? (
            <button
              type="button"
              onClick={removeFavoriteHandler}
              className={` 
              text-blue-900 hover:text-red-500 transition`}
            >
              <span aria-label="Remove from favorites">
                <StarFilled className="w-6 h-6" />
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={removeFavoriteHandler}
              className="text-custom-blue-10 hover:text-blue-500 transition"
            >
              <span aria-label="Add to favorites">
                <StarEmpty className="w-6 h-6" />
              </span>
            </button>
          )}
          
        </div>
      </div>
      
    </div>
    <Link href={`/FavoritesPage/similarRecipes of ${recipe.title}`} > View similar recipes</Link>
    </>
  );
};

export default FavCard;
