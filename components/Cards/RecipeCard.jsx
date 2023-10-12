// RecipeCard.js
import React from "react";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "../../helpers/settings/settings";
import { formatTime } from "../../helpers/TimeConvertor";
import calculateTotalTime from "../TimeAndDate/TotalTimeConverntion";

const RecipeCard = ({ recipe  }) => {
  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div  className="bg-amber-600 p-4 rounded shadow mb-4">
      <h2 className="text-2xl font-semibold">{recipe.title}</h2>
      <h3 className="mt-2 text-lg font-semibold">Images</h3>
      <section className="list-disc list-inside">
        <Carousel responsive={responsive}>
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
      <p className="text-gray-600">
        <b>Prep Time:</b> {formatTime(recipe.prep)} minutes
      </p>
      <p className="text-gray-600">
        <b>Cook Time:</b> {formatTime(recipe.cook)} minutes
      </p>
      <p className="text-gray-600">
        <b>Total Time:</b> {calculateTotalTime(recipe.prep, recipe.cook)}
      </p>
      <p className="text-gray-600">
        <b>Category:</b> {recipe.category}
      </p>
      <p className="text-gray-600">
        <b>Servings:</b> {recipe.servings}
      </p>
      <b>Published:</b>
      <p className="text-gray-600">
        {new Date(recipe.published).toLocaleDateString()}
      </p>

      <h3 className="mt-2 text-lg font-semibold">Tags:</h3>

      <ul className="list-disc list-inside">
        {recipe.tags.map((tag, index) => (
          <li key={index} className="text-gray-600">
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeCard;
