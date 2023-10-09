import React, { useEffect, useState } from "react";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Link from "next/link";
import { responsive } from "../../helpers/settings/settings";

import type { Recipe } from "../Types/recipeTypes";
const RecipeList: React.FC<{ recipe: Recipe }> = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    const fetchRecipes = async (page:number) => {
      try {
        const response = await fetch(`/api/recipes?page=${page}`);
        if (response.ok) {
          const fetchedRecipes = await response.json();
          setRecipes(fetchedRecipes.recipes);
          setLoading(false); // Set loading to false when data is fetched
        } else {
          console.error("Failed to fetch recipes");
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage:number) => {
    setCurrentPage(newPage);
  };
return(
  <div>
     <h1 className="text-3xl font-bold mb-4">Recipes</h1>
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    
      {/* Display loading message while data is being fetched */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {recipes.map((recipe:any) => (
            <div
              key={recipe._id}
              className="bg-purple-300 p-4 rounded shadow mb-4"
            >
              <Link href={`/${encodeURIComponent(recipe.title)}`} key={recipe._id}>
                <h2 className="text-2xl font-semibold">{recipe.title}</h2>
                <p className="text-gray-600">{recipe.description}</p>
                <p className="text-gray-600">
                  Prep Time: {recipe.prep} minutes
                </p>
                <p className="text-gray-600">
                  Cook Time: {recipe.cook} minutes
                </p>
                <p className="text-gray-600">Category: {recipe.category}</p>
                <p className="text-gray-600">Servings: {recipe.servings}</p>
                <p className="text-gray-600">
                  Published: {new Date(recipe.published).toLocaleDateString()}
                </p>
                <h3 className="mt-2 text-lg font-semibold">Tags:</h3>
                <ul className="list-disc list-inside">
                  {recipe.tags.map((tag:number, index:number) => (
                    <li key={index} className="text-gray-600">
                      {tag}
                    </li>
                  ))}
                </ul>
              </Link>
              <h3 className="mt-2 text-lg font-semibold">Images</h3>
              <ul className="list-disc list-inside">
                <Carousel responsive={responsive}>
                  {recipe.images.map((image:string, index:number) => (
                    <div key={index} className="text-gray-600">
                      <div>
                        <Image
                          src={image}
                          alt={recipe.title}
                          width={300}
                          height={300}
                          className="w-full h-30"
                        />
                      </div>
                    </div>
                  ))}
                </Carousel>
              </ul>
            </div>
          ))}
        </>
      )}
    </div>
    <div className="flex justify-between mt-4">
  <button
    onClick={() => handlePageChange(currentPage - 1)}
    disabled={currentPage === 1}
    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
      currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
    }`}
  >
    Previous
  </button>
  <button
    onClick={() => handlePageChange(currentPage + 1)}
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  >
    Next
  </button>
</div>
  </div>
)
};

export default RecipeList;
