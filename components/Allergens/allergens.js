import { useState } from "react";
import classes from "./allergens.module.css";

function Allergens({ recipeIngredients, allergens }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const allergensList = allergens.filter(
    (allergen) =>
      recipeIngredients &&
      recipeIngredients.length > 0 &&
      recipeIngredients.some((ingredient) =>
        ingredient.toLowerCase().includes(allergen.toLowerCase())
      )
  );

  const hasAllergens = allergensList.length > 0;

  if (!hasAllergens) {
    return null;
  }

  return (
    <>
      <div className="dropdown mt-4 mb-4">
        <h2>Allergens</h2>
        <div className="flex flex-wrap justify-start ">
          {allergensList.length > 0 ? (
            <ul
              className={`flex flex-wrap justify-evenly sm:justify-center md:justify-between ${classes["align-left"]}`}
            >
              {allergensList.map((allergen, index) => {
                // Check if the allergen is "egg" and handle pluralization
                const ingredientAmount = recipeIngredients.find((ingredient) =>
                  ingredient.toLowerCase().includes(allergen.toLowerCase())
                );
                const isPlural =
                  ingredientAmount &&
                  ingredientAmount.toLowerCase().includes("eggs");

                return (
                  <li
                    key={index}
                    className={`mr-4 p-2 mb-2 sm:mb-0 md:mb-0 sm:mr-1 md:mr-4 ${classes["dropdown-item"]}`}
                  >
                    <div className="flex items-center">
                      <span className="mr-2">
                        <img
                          src={`/images/${allergen}.png`}
                          alt={allergen}
                          width={24}
                          height={24}
                        />
                      </span>
                      {allergen}
                      {/* {isPlural ? " (eggs)" : " (egg)"} */}
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>No Allergens present in this recipe.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Allergens;
