
// function Allergens({ allergens }) {
//   if (!Array.isArray(allergens)) {
//     return <div>No allergens data available.</div>;
//   }
//   // const [allergens, setAllergens] = useState([]);

//   // useEffect(() => {
//     // fetch("/api/allergens")
//       // .then((response) => response.json())
//       // .then((data) => setAllergens(data))
//       // .catch((error) => console.error("Error fetching allergens:", error));
//   // }, []);

//   return (
//     <>
//       <p>Allergens</p>
//       <ul>
//         {allergens.map((all, index) => (
//           <li key={index}>{all}</li>
//         ))}
//       </ul>
//     </>
//   );
// }

// export default Allergens;


import React, { useState } from 'react';
import classes from './allergens.module.css';

function Allergens({ allergens }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      
      <div className="dropdown">
        <button onClick={toggleDropdown} className={classes["dropdown-toggle"]}>
          Allergens
        </button>
        {isDropdownOpen && (
          <ul className={classes["dropdown-menu"]}>
            {allergens.map((all, index) => (
              <li key={index} className={classes["dropdown-item"]}>
                {all}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Allergens;

