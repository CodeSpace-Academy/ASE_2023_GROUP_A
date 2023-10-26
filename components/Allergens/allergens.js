import { useState } from "react";
import classes from "./allergens.module.css";

function Allergens({ allergens }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <div className="dropdown mt-4">
        <button onClick={toggleDropdown} className={classes["dropdown-toggle"]}>
          Allergens
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
          </svg>
        </button>
        {isDropdownOpen && (
          <div className="flex flex-wrap justify-center "> 
        <ul className="flex flex-wrap justify-evenly sm:justify-center md:justify-between">
          {allergens.map((all, index) => (
            <li key={index} className={`text-center mb-2 sm:mb-0 md:mb-0 sm:mr-1 md:mr-4 ${classes["dropdown-item"]}`}>
              <span className="mr-1 ">
                <img src={`/images/icons/${all}.png`} alt={all} width={24} height={24} />
              </span>
              {all}
            </li>
          ))}
        </ul>
      </div>
        )}
      </div>
    </>
  );
}

export default Allergens;


// // Import necessary libraries and components

// function Allergens({ allergens, onAllergenSelect, selectedAllergen }) {
//   return (
//     <div className="allergens">
//       <h2>Allergens:</h2>
//       <div className="allergen-list">
//         {allergens.map((allergen, index) => (
//           <div
//             key={index}
//             className={`allergen-item ${selectedAllergen === allergen ? 'selected' : ''}`}
//             onClick={() => onAllergenSelect(allergen)}
//           >
//             {allergen}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Allergens;


