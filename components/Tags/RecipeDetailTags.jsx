import React from "react";
import { FaTag } from "react-icons/fa";

/**
 * Component for displaying tags associated with a recipe.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.recipe - The recipe object containing information like tags.
 * @returns {JSX.Element} The RecipeDetailTags component.
 */
const RecipeDetailTags = ({ recipe }) => {
  try {
    if (!recipe) {
      return <div>Loading please wait...</div>;
    }

    /**
     * Render tags associated with the recipe.
     *
     * @returns {JSX.Element} The rendered tags.
     */
    const renderTags = () => (
      <ul className="list-disc list-inside">
        {recipe.tags.map((tag) => (
          <li key={tag} className="text-gray-1000">
            {tag}
          </li>
        ))}
      </ul>
    );

    return (
      <div className="pb-2 items-center pt-2">
        <div className="flex">
          <FaTag className="mr-2" />
          <b>Tags</b>
        </div>
        {renderTags()}
      </div>
    );
  } catch (error) {
    console.error("An error occurred:", error);
    return <div>Failed to load tags!</div>;
  }
};

export default RecipeDetailTags;
