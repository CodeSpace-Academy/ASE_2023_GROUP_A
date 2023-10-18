// RecipeCard.js
import React from "react";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "../../helpers/settings/settings";
import CookTime from "../TimeAndDate/TimeConvertor";
import Description from "../Description/Description";
import Tags from "../Tags/Tags";

const RecipeCard = ({ recipe ,newDescription }) => {
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
      <Description description={recipe.description}  recipeId={recipe._id}/>


      <CookTime cookTimeInMinutes = {recipe.prep} label={'Prep Time'} />

      <CookTime cookTimeInMinutes={recipe.cook} label={'Cook Time'} />

      <CookTime cookTimeInMinutes={recipe.cook} prepTimeInMinutes={recipe.prep}  label='Total time'/>

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

     <Tags recipe={recipe}/>

    </div>
  );
};


export default RecipeCard;
