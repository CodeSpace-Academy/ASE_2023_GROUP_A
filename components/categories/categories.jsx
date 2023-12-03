import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useTheme } from "../Context/ThemeContext";

/**
 * Functional component representing a multi-select dropdown for categories.
 *
 * @component
 * @param {Object} props - The component's props.
 * @param {string[]} props.selectedCategories - The selected categories.
 * @param {Function} props.setSelectedCategories - The function to set selected categories.
 * @returns {JSX.Element} - The component's rendered elements.
 */
function Categories({ selectedCategories, setSelectedCategories }) {
  const [categories, setCategories] = useState([]);
  const { theme } = useTheme();

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
        } else {
          throw Error("Failed to fetch categories");
        }
      } catch (error) {
        throw Error("Error fetching categories:", error);
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
      background: "#3496c7",
      color: "white",
    }),

    control: (base) => ({
      ...base,
      backgroundColor: theme === 'light' ? "#007bff" : "#0d203eee",
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
      zIndex: "100",
    }),
  };

  return (
    <div>
      <Select
        isMulti
        options={categories}
        value={categories.filter((category) => selectedCategories?.includes(category.value))}
        onChange={handleCategoryChange}
        styles={customStyles}
        blurInputOnSelect
        placeholder="Select Category"
      />
    </div>
  );
}

export default Categories;
