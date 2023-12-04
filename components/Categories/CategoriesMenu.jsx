/* eslint-disable consistent-return */
import React, { useState, useEffect } from "react";
import Select from "react-select";

/**
 * Functional component representing a multi-select dropdown for categories.
 *
 * @component
 * @param {Object} props - The component's props.
 * @param {string[]} props.selectedCategories - The selected categories.
 * @param {Function} props.setSelectedCategories - The function to set selected categories.
 * @returns {JSX.Element} - The component's rendered elements.
 */
const Categories = ({ selectedCategories, setSelectedCategories }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    /**
     * Fetches categories from the server and sets them in the component state.
     *
     * @async
     * @function
     * @throws {Error} If there is an issue fetching categories.
     */
    async function fetchCategories() {
      try {
        const response = await fetch("/api/categories");

        if (response.ok) {
          const data = await response.json();
          setCategories(
            data[0].categories.map((category) => ({
              label: category,
              value: category,
            })),
          );
        }
      } catch (error) {
        return error("Error fetching categories:", error);
      }
    }

    fetchCategories();
  }, []);

  /**
   * Handles the change event when categories are selected or deselected.
   *
   * @param {Object[]} selectedOptions - The selected category options to filter by.
   */
  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions.map((option) => option.value));
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
      color: "black",
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
        options={categories}
        value={categories.filter((category) => (selectedCategories
          ? selectedCategories.includes(category.value) : []))}
        onChange={handleCategoryChange}
        styles={customStyles}
        blurInputOnSelect
        placeholder="Select category"
      />
    </div>
  );
};

export default Categories;
