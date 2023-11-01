import { useState } from "react";
import classes from "./allergens.module.css";
import DropDownSVG from "../IconsAndSvg's/DropDownSVG";

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
          <DropDownSVG/>
        </button>
        {isDropdownOpen && (
          <div className="flex flex-wrap justify-center "> 
        <ul className="flex flex-wrap justify-evenly sm:justify-center md:justify-between">
          {allergens.map((allergen, index) => (
            <li key={index} className={`text-center mb-2 sm:mb-0 md:mb-0 sm:mr-1 md:mr-4 ${classes["dropdown-item"]}`}>
              <span className="mr-1 ">
                <img src={`/images/icons/${allergen}.png`} alt={allergen} width={24} height={24} />
              </span>
              {allergen}
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


