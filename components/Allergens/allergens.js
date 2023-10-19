import { useState } from "react";
import classes from "./allergens.module.css";

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
          <div className="flex flex-wrap justify-center"> 
  <ul className="flex flex-wrap justify-evenly sm:justify-center md:justify-between">
    {allergens.map((all, index) => (
      <li key={index} className={`text-center mb-1 sm:mb-0 md:mb-0 sm:mr-1 md:mr-4 ${classes["dropdown-item"]}`}>
        <span className="mr-2">
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




