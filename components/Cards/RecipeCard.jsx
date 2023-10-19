import React from "react";
import Image from "next/image";
import Link from "next/link";

const RecipeCard = ({ recipe }) => {
  if (!recipe) {
    return <div>Loading...</div>;
  }

  const firstImage = recipe.images[0];

  return (
    <div className="bg-white p-4 rounded shadow mb-4 md:h-96 flex flex-col transform transition-transform hover:scale-105">
      {/* Make cards white */}
      <div className="w-full h-48 md:h-60 mb-4 relative">
        <Image
          src={firstImage}
          alt={recipe.title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div className="flex flex-col justify-between h-full">
        <h2 className="text-2xl font-semibold mb-2">{recipe.title}</h2>
        <div className="rounded bg-red-500 text-white p-2 mt-2 transition-transform hover:scale-105 duration-300 ease-in-out">
          <Link href={`/${encodeURIComponent(recipe.title)}`}>
            <button className="w-full text-center">View Recipe</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
