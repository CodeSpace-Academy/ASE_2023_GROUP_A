/**
 * Allergens component displays a list of allergens based on the given recipe ingredients.
 * @param {Object} props - Component properties.
 * @param {Array} props.recipeIngredients - List of ingredients in the recipe.
 * @param {Array} props.allergens - List of allergens to check against the recipe ingredients.
 * @returns {JSX.Element} - Rendered component.
 */
import React from "react";
import classes from "./allergens.module.css";

function Allergens({ recipeIngredients, allergens }) {
  // Filter allergens based on the recipe ingredients
  const allergensList = allergens.filter(
    (allergen) => recipeIngredients
      && recipeIngredients.length > 0
      && recipeIngredients.some((ingredient) => ingredient.toLowerCase()
        .includes(allergen.toLowerCase())),
  );

  // Check if there are any allergens to display
  const hasAllergens = allergensList.length > 0;

  // If no allergens, return an empty div to render nothing
  if (!hasAllergens) {
    return <div />;
  }

  // Render the component with allergens
  return (
    <div>
      <div className="mt-4 mb-4">
        <b>Allergens</b>
        <div className="flex flex-wrap justify-start mt-4">
          {allergensList.length > 0 && (
            <ul
              className={`flex flex-wrap justify-evenly sm:justify-center md:justify-between  ${classes["align-left"]}`}
            >
              {allergensList.map((allergen) =>
                // Render each allergen as a list item
                // eslint-disable-next-line implicit-arrow-linebreak
                (
                  <li
                    key={allergen.index}
                    className={`mr-4 p-2 mb-2 sm:mb-0 md:mb-0 sm:mr-1 md:mr-4 ${classes["button-86"]}`}
                  >
                    <div className="flex items-center">{allergen}</div>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Allergens;
