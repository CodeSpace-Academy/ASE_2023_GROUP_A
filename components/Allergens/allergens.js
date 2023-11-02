import { useState } from "react";
import classes from "./allergens.module.css";

function Allergens({ recipeIngredients, allergens }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const allergensList = allergens.filter((allergen) =>
    recipeIngredients && recipeIngredients.length > 0 && recipeIngredients.some((ingredient) =>
      ingredient.toLowerCase().includes(allergen.toLowerCase())
    )
  );

  return (
    <>
      <div className="dropdown mt-4">
        <button onClick={toggleDropdown} className={classes["dropdown-toggle"]}>
          Allergens
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
            />
          </svg>
        </button>
        {isDropdownOpen && (
          <div className="flex flex-wrap justify-start ">
            {allergensList.length > 0 ? (
              <ul className={`flex flex-wrap justify-evenly sm:justify-center md:justify-between ${classes["align-left"]}`}>
                {allergensList.map((allergen, index) => {
                  // Check if the allergen is "egg" and handle pluralization
                  const ingredientAmount = recipeIngredients.find(ingredient => ingredient.toLowerCase().includes(allergen.toLowerCase()));
                  const isPlural = ingredientAmount && ingredientAmount.toLowerCase().includes("eggs");

                  return (
                    <li key={index} className={`mr-4 p-2 mb-2 sm:mb-0 md:mb-0 sm:mr-1 md:mr-4 ${classes["dropdown-item"]}`}>
                      <div className="flex items-center">
                        <span className="mr-2">
                          <img
                            src={`/images/icons/${allergen}.png`}
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
        )}
      </div>
    </>
  );
}

export default Allergens;