// /**
//  * Allergens component displays a list of allergens based on the given recipe ingredients.
//  * @param {Object} props - Component properties.
//  * @param {Array} props.recipeIngredients - List of ingredients in the recipe.
//  * @param {Array} props.allergens - List of allergens to check against the recipe ingredients.
//  * @returns {JSX.Element} - Rendered component.
//  */

// import classes from "./allergens.module.css";

// function Allergens({ recipeIngredients, allergens }) {
//   // Filter allergens based on the recipe ingredients
//   const allergensList = allergens.filter(
//     (allergen) =>
//       recipeIngredients &&
//       recipeIngredients.length > 0 &&
//       recipeIngredients.some((ingredient) =>
//         ingredient.toLowerCase().includes(allergen.toLowerCase())
//       )
//   );

//   // Check if there are any allergens to display
//   const hasAllergens = allergensList.length > 0;

//   // If no allergens, return an empty div to render nothing
//   if (!hasAllergens) {
//     return <div />;
//   }

//   // Render the component with allergens
//   return (
//     <div>
//       <div className="mt-4 mb-4">
//         <b>Allergens</b>
//         <div className="flex flex-wrap justify-start mt-4">
//           {allergensList.length > 0 && (
//             <ul
//               className={`flex flex-wrap justify-evenly sm:justify-center md:justify-between  ${classes["align-left"]}`}
//             >
//               {allergensList.map((allergen, index) => {
//                 // Check if the allergen is "egg" and handle pluralization
//                 const ingredientAmount = recipeIngredients.find((ingredient) =>
//                   ingredient.toLowerCase().includes(allergen.toLowerCase())
//                 );
//                 const isPlural =
//                   ingredientAmount &&
//                   ingredientAmount.toLowerCase().includes("eggs");

//                 // Render each allergen as a list item
//                 return (
//                   <li
//                     key={index}
//                     className={`mr-4 p-2 mb-2 sm:mb-0 md:mb-0 sm:mr-1 md:mr-4 ${classes["button-86"]}`}
//                     role="button"
//                   >
//                     <div className={`flex items-center`}>{allergen}</div>
//                   </li>
//                 );
//               })}
//             </ul>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Allergens;





import classes from "./allergens.module.css";

function Allergens({ recipeIngredients, allergens }) {



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
        <b>Allergens</b>
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
                          src={`./images/${allergen}.png`}
                          alt={allergen}
                          width={24}
                          height={24}
                        />
                      </span>
                      {allergen}
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
