/* eslint-disable no-plusplus */
import React, { useEffect } from "react";
import Badge from "@mui/material/Badge";
import { FaTrash } from "react-icons/fa";

/**
 * Keeps track of the number of filters applied and number of recipes being displayed. Also resets
 * filters
 *
 * @component
 * @param {Object} props - The component's props.
 * @param {number} props.numberOfRecipes - The number of recipes.
 * @param {Function} props.handleDefault - The function to handle resetting filters to default.
 * @param {number} props.filterCount - The count of active filters.
 * @returns {JSX.Element} - The component's rendered elements.
 */
export default function Badges({
  numberOfRecipes,
  handleDefault,
  selectedCategories,
  selectedIngredients,
  selectedTags,
  selectedInstructions,
  filterCount,
  setFilterCount,
}) {
  function countAppliedFilters(
    Categories,
    Ingredients,
    Tags,
    Instructions,
  ) {
    let count = 0;

    if (Categories.length > 0) {
      count++;
    }

    if (Ingredients.length > 0) {
      count++;
    }

    if (Tags.length > 0) {
      count++;
    }

    if (Instructions > 0) {
      count++;
    }
    // Check if selectedInstructions is not null before comparing
    if (Instructions !== null && Instructions > 0) {
      count++;
    }
    return count;
  }
  useEffect(() => {
    const counts = countAppliedFilters(
      selectedCategories,
      selectedIngredients,
      selectedTags,
      selectedInstructions,
    );
    setFilterCount(counts);
  }, [
    selectedTags,
    selectedIngredients,
    selectedCategories,
    selectedInstructions,
  ]);
  return (
    <div className="flex mt-10">
      {/* Badge for active filters */}
      <Badge
        badgeContent={filterCount}
        color="primary"
        style={{ margin: "auto", fontWeight: "bold", zIndex: "-1" }}
      >
        FILTERS
      </Badge>

      {/* Button to reset filters */}
      <button type="button" onClick={handleDefault}>
        <span
          style={{ display: "inline-flex", fontWeight: "bold", gap: "0.2em" }}
        >
          Remove Filters
          <FaTrash style={{ color: "blue", opacity: "0.5" }} />
        </span>
      </button>

      <Badge
        badgeContent={numberOfRecipes}
        color="primary"
        style={{ margin: "auto", fontWeight: "bold", zIndex: "-1" }}
      >
        Recipes
      </Badge>
    </div>
  );
}
