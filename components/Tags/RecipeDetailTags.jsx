import React from "react";
import { v4 as KeyUUID } from "uuid"; // Import mutate for manual revalidation

const RecipeDetailTags = ({ recipe }) => {
  try {
    if (!recipe) {
      return <div>Loading please wait...</div>;
    }

    // Display tags for the recipe
    return (
      <div>
        <ul className="list-disc list-inside">
          {recipe.tags.map((tag) => (
            <li key={KeyUUID()} className="text-black-600">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    // Handle and log errors that occur during tag rendering
    console.error("An error occurred:", error);
    return <div>Failed to load tags!</div>;
  }
};

export default RecipeDetailTags;
