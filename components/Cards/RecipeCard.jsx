// RecipeCard.js

import React from "react";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "../../helpers/settings/settings";
import CookTime from "../TimeAndDate/TimeConvertor";
import Tags from "../Tags/Tags";

// RecipeCard component displays information about a recipe
const RecipeCard = ({ recipe }) => {
  // If no recipe data is available, display a loading message
  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-amber-600 p-4 rounded shadow mb-4">
      <h2 className="text-2xl font-semibold">{recipe.title}</h2>
      <h3 className="mt-2 text-lg font-semibold">Images</h3>
      <section className="list-disc list-inside">
        <Carousel responsive={responsive}>
          {/* Map through recipe images and display them in a carousel */}
          {recipe.images.map((image) => (
            <div key={image} className="text-gray-600">
              <div>
                <Image
                  src={image}
                  alt={recipe.title}
                  width={300}
                  height={300}
                  className="max-w-full h-auto object-fit: cover"
                />
              </div>
            </div>
          ))}
        </Carousel>
      </section>
      <p className="text-gray-600">{recipe.description}</p>

      {/* Display preparation, cooking, and total time for the recipe */}
      <CookTime cookTimeInMinutes={recipe.prep} label={'Prep Time'} />
      <CookTime cookTimeInMinutes={recipe.cook} label={'Cook Time'} />
      <CookTime cookTimeInMinutes={recipe.cook} prepTimeInMinutes={recipe.prep} label='Total time' />

      {/* Display the category and servings information for the recipe */}
      <p className="text-gray-600">
        <b>Category:</b> {recipe.category}
      </p>
      <p className="text-gray-600">
        <b>Servings:</b> {recipe.servings}
      </p>

      {/* Display the publication date of the recipe */}
      <b>Published:</b>
      <p className="text-gray-600">
        {new Date(recipe.published).toLocaleDateString()}
      </p>

      {/* Display tags associated with the recipe using the Tags component */}
      <Tags recipe={recipe}/>
    </div>
  );
};

export default RecipeCard;
