import React, { useEffect, useState } from "react";
import Select from "react-select";

/**
 * Functional component representing a multi-select dropdown for ingredients.
 *
 * @component
 * @param {Object} props - The component's props.
 * @param {string[]} props.selectedIngredients - The selected ingredients.
 * @param {Function} props.setSelectedIngredients - The function to set selected ingredients.
 * @returns {JSX.Element} - The component's rendered elements.
 */
function Ingredients({ selectedIngredients, setSelectedIngredients }) {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    /**
     * Fetches ingredients from the server and sets them in the component state.
     *
     * @async
     * @function
     * @throws {Error} If there is an issue fetching ingredients.
     */
    async function fetchIngredients() {
      try {
        const response = await fetch("/api/ingredients");

        if (response.ok) {
          const data = await response.json();

          setIngredients(
            data.map((ingredient) => ({
              label: ingredient,
              value: ingredient,
            })),
          );
        } else {
          throw Error;
        }
      } catch (error) {
        throw Error;
      }
    }

    fetchIngredients();
  }, []);

  /**
   * Handles the change event when ingredients are selected or deselected.
   *
   * @param {Object[]} selectedOptions - The selected ingredient options to filter by.
   */
  const handleIngredientChange = (selectedOptions) => {
    setSelectedIngredients(selectedOptions.map((option) => option.value));
  };

  // Custom styles for the React Select component
  const customStyles = {
    multiValue: (base) => ({
      ...base,
      background: "red",
      color: "white",
    }),

    control: (base) => ({
      ...base,
      backgroundColor: "#007bff",
      color: "white",
      width: "fitContent",
      cursor: "pointer",

      "&:hover": { background: "lightBlue" },
    }),

    multiValueLabel: (base) => ({
      ...base,
      color: "white",
      fontWeight: "bold",
    }),

    placeholder: (base) => ({
      ...base,
      color: "white",
    }),

    menu: (base) => ({
      ...base,
      width: "12em",
    }),
  };

  return (
    <div>
      <Select
        isMulti
        options={ingredients}
        value={ingredients.filter((ingredient) => (selectedIngredients
          ? selectedIngredients.includes(ingredient.value) : []))}
        onChange={handleIngredientChange}
        styles={customStyles}
        blurInputOnSelect
        placeholder="Select ingredient"
      />
    </div>
  );
}

export default Ingredients;
