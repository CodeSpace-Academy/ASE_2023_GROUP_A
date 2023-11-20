// import { useState } from "react";

// import classes from "./allergens.module.css";

// function Allergens({ recipeIngredients, allergens }) {



//   const allergensList = allergens.filter(
//     (allergen) =>
//       recipeIngredients &&
//       recipeIngredients.length > 0 &&
//       recipeIngredients.some((ingredient) =>
//         ingredient.toLowerCase().includes(allergen.toLowerCase())
//       )
//   );

//   const hasAllergens = allergensList.length > 0;

//   if (!hasAllergens) {
//     return null;
//   }

//   return (
//     <>
//       <div className="dropdown mt-4 mb-4">
//         <b>Allergens</b>
//         <div className="flex flex-wrap justify-start ">
//           {allergensList.length > 0 ? (
//             <ul
//               className={`flex flex-wrap justify-evenly sm:justify-center md:justify-between ${classes["align-left"]}`}
//             >
//               {allergensList.map((allergen, index) => {
//                 // Check if the allergen is "egg" and handle pluralization
//                 const ingredientAmount = recipeIngredients.find((ingredient) =>
//                   ingredient.toLowerCase().includes(allergen.toLowerCase())
//                 );
//                 const isPlural =
//                   ingredientAmount &&
//                   ingredientAmount.toLowerCase().includes("eggs");

//                 return (
//                   <li
//                     key={index}
//                     className={`mr-4 p-2 mb-2 sm:mb-0 md:mb-0 sm:mr-1 md:mr-4 ${classes["dropdown-item"]}`}
//                   >
//                     <div className="flex items-center">
//                       <span className="mr-2">
//                         {/* <img
//                           src={`/images/${allergen}.png`}
//                           alt={allergen}
//                           width={24}
//                           height={24}
//                         /> */}
//                       </span>
//                       {allergen}
//                       {/* {isPlural ? " (eggs)" : " (egg)"} */}
//                     </div>
//                   </li>
//                 );
//               })}
//             </ul>
//           ) : (
//             <p>No Allergens present in this recipe.</p>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Allergens;

// import { FaCheese, FaEgg, FaFish, FaMilk, FaNut, FaWheat } from 'react-icons/fa';
// import { GiCelery, GiClam, GiCorn, GiCream, GiMussel, GiMustard, GiOyster, GiSesame, GiSoy } from 'react-icons/gi';
// import classes from "./allergens.module.css";

// function getAllergenIcon(allergen) {
//   switch (allergen) {
//     case "cheese":
//       return <FaCheese />;
//     case "celery":
//       return <GiCelery />;
//     case "clam":
//       return <GiClam />;
//     case "corn":
//       return <GiCorn />;
//     case "cream":
//       return <GiCream />;
//     case "egg":
//       return <FaEgg />;
//     case "fish":
//       return <FaFish />;
//     case "milk":
//       return <FaMilk />;
//     case "mussel":
//       return <GiMussel />;
//     case "mustard":
//       return <GiMustard />;
//     case "nut":
//       return <FaNut />;
//     case "oyster":
//       return <GiOyster />;
//     case "sesame":
//       return <GiSesame />;
//     case "soy":
//       return <GiSoy />;
//     case "wheat":
//       return <FaWheat />;
//     default:
//       return null;
//   }
// }

// function Allergens({ recipeIngredients, allergens }) {
//   const allergensList = allergens.filter((allergen) => {
//     if (!recipeIngredients || recipeIngredients.length === 0) {
//       return false;
//     }

//     const allergenRegExp = new RegExp(allergen.toLowerCase(), 'i');
//     return recipeIngredients.some((ingredient) => allergenRegExp.test(ingredient.toLowerCase()));
//   });

//   if (allergensList.length === 0) {
//     return null;
//   }

//   return (
//     <div className={classes.dropdown + " mt-4 mb-4"}>
//       <b>Allergens</b>
//       <div className={classes.allergensList}>
//         <ul className={classes.allergensList}>
//           {allergensList.map((allergen, index) => {
//             const ingredientAmounts = recipeIngredients.filter((ingredient) => ingredient.toLowerCase().includes(allergen.toLowerCase()));

//             return (
//               <li key={index} className={classes.allergenItem}>
//                 <div className="flex items-center">
//                   {getAllergenIcon(allergen)}
//                   {allergen} {ingredientAmounts.length > 1 && `(${ingredientAmounts.length})`}
//                 </div>
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default Allergens;





// import { useState } from "react";
// import { FaCheese, FaEgg, FaFish, FaMilk, FaNut, FaWheat } from 'react-icons/fa';
// import { GiCelery, GiClam, GiCorn, GiCream, GiMussel, GiMustard, GiOyster, GiSesame, GiSoy } from 'react-icons/gi';
// import classes from "./allergens.module.css";

// function Allergens({ recipeIngredients, allergens }) {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };
//   const allergenIcons = {
//     cheese: <FaCheese />,
//     celery: <GiCelery />,
//     clam: <GiClam />,
//     corn: <GiCorn />,
//     cream: <GiCream />,
//     egg: <FaEgg />,
//     fish: <FaFish />,
//     milk: <FaMilk />,
//     mussel: <GiMussel />,
//     mustard: <GiMustard />,
//     nut: <FaNut />,
//     oyster: <GiOyster />,
//     sesame: <GiSesame />,
//     soy: <GiSoy />,
//     wheat: <FaWheat />,
//   };

//   const allergensList = allergens.filter(
//     (allergen) =>
//       recipeIngredients &&
//       recipeIngredients.length > 0 &&
//       recipeIngredients.some((ingredient) =>
//         ingredient.toLowerCase().includes(allergen.toLowerCase())
//       )
//   );

//   const hasAllergens = allergensList.length > 0;

//   if (!hasAllergens) {
//     return null;
//   }

//   return (
//     <>
//       <div className="dropdown mt-4 mb-4">
//         <b>Allergens</b>
//         <div className="flex flex-wrap justify-start ">
//           {allergensList.length > 0 ? (
//             <ul
//               className={`flex flex-wrap justify-evenly sm:justify-center md:justify-between ${classes["align-left"]}`}
//             >
//               {allergensList.map((allergen, index) => {
//                 const ingredientAmount = recipeIngredients.find((ingredient) =>
//                   ingredient.toLowerCase().includes(allergen.toLowerCase())
//                 );
//                 const isPlural =
//                   ingredientAmount &&
//                   ingredientAmount.toLowerCase().includes("eggs");

//                 return (
//                   <li
//                     key={index}
//                     className={`mr-4 p-2 mb-2 sm:mb-0 md:mb-0 sm:mr-1 md:mr-4 ${classes["dropdown-item"]}`}
//                   >
//                     <div className="flex items-center">
//                       <span className="mr-2">
//                         {allergenIcons[allergen.toLowerCase()]}
//                       </span>
//                       {allergen}
//                       {/* {isPlural ? " (eggs)" : " (egg)"} */}
//                     </div>
//                   </li>
//                 );
//               })}
//             </ul>
//           ) : (
//             <p>No Allergens present in this recipe.</p>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Allergens;


// import classes from "./allergens.module.css";

// function Allergens({ recipeIngredients, allergens }) {

//   const allergensList = allergens.filter(
//     (allergen) =>
//       recipeIngredients &&
//       recipeIngredients.length > 0 &&
//       recipeIngredients.some((ingredient) =>
//         ingredient.toLowerCase().includes(allergen.toLowerCase())
//       )
//   );

//   const hasAllergens = allergensList.length > 0;

//   if (!hasAllergens) {
//     return null;
//   }

//   return (
//     <>
//     <div>
//       <div className="dropdown mt-4 mb-4">
//         <b>Allergens</b>
//         <div className="flex flex-wrap justify-start   ">
//           {allergensList.length > 0 ? (
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

//                 return (
//                   <button class="cicrle-11" role="button">
//                   <li
//                     key={index}
//                     className={`mr-4 p-2 mb-2  sm:mb-0 md:mb-0 sm:mr-1 md:mr-4 ${classes["circle-11"]}`}
//                   >
//                     <div className={`flex items-center ${classes["circle-11"]}`}>
//                       {allergen}
//                       {/* {isPlural ? " (eggs)" : " (egg)"} */}
//                     </div>
//                   </li>
//                   </button>
//                 );
//               })}
//             </ul>
//           ) : null}
//         </div>
//       </div>
      
//       </div>
//     </>
//   );
// }

// export default Allergens;



import React from 'react';
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
    <div>
      <div className=" mt-4 mb-4">
        <b>Allergens</b>
        <div className="flex flex-wrap justify-start mt-4">
          {allergensList.length > 0 ? (
            <ul
              className={`flex flex-wrap justify-evenly sm:justify-center md:justify-between  ${classes["align-left"]}`}
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
                    className={`mr-4 p-2 mb-2  sm:mb-0 md:mb-0 sm:mr-1 md:mr-4 ${classes["button-86"]}`}
                    role="button"
                  >
                    <div className={`flex items-center`}>
                      {allergen}
                      {/* {isPlural ? " (eggs)" : " (egg)"} */}
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Allergens;
