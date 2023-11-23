import React from "react";
import classes from "./hero.module.css";
import SearchBar from "../searchBar/searchBar";
import Categories from "../categories/categories";
import Tags from "../Tags/Tags";
import Ingredients from "../ingredients/ingredients";
import DropdownMenu from "../sort/sort";
import InstructionF from "../Instructions/instructions";

/**
 * Functional component representing the hero section of the application.
 *
 * @component
 * @param {Object} props - The component's props.
 * @param {Function} props.handleDefaultSearch - The function to handle default search.
 * @param {Function} props.onSearch - The function to handle search.
 * @param {Function} props.setSearchQuery - The function to set the search query.
 * @param {string} props.searchQuery - The current search query.
 * @param {Array} props.selectedTags - The selected tags for filtering.
 * @param {Function} props.setSelectedTags - The function to set selected tags.
 * @param {Array} props.selectedCategories - The selected categories for filtering.
 * @param {Function} props.setSelectedCategories - The function to set selected categories.
 * @param {Array} props.selectedIngredients - The selected ingredients for filtering.
 * @param {Function} props.setSelectedIngredients - The function to set selected ingredients.
 * @param {Array} props.selectedInstructions - The selected number of instructions for filtering.
 * @param {Function} props.handleChange - The function to handle changes in instructions input.
 * @param {Function} props.setSortOrder - The function to set the sorting order.
 * @param {string} props.sortOrder - The current sorting order.
 * @returns {JSX.Element} - The component's rendered elements.
 */
export default function Hero({
  handleDefaultSearch,
  onSearch,
  setSearchQuery,
  searchQuery,
  selectedTags,
  setSelectedTags,
  selectedCategories,
  setSelectedCategories,
  selectedIngredients,
  setSelectedIngredients,
  selectedInstructions,
  handleChange,
  setSortOrder,
  sortOrder,
}) {
  return (
    <div className={`sm:portrait:h-screen max-w-full ${classes.heroImage}`}>
      <div className={`sm:mt-20 sm:block sm: ${classes.heroContent}`}>
        <div className={classes.search}>
          <SearchBar
            handleDefault={handleDefaultSearch}
            onSearch={onSearch}
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
          />
        </div>
        <div
          className={`flex flex-col md:flex-row sm:block ${classes.filters}`}
        >
          <Categories
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
          <Tags selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
          <Ingredients
            selectedIngredients={selectedIngredients}
            setSelectedIngredients={setSelectedIngredients}
          />
          <InstructionF
            selectedInstructions={selectedInstructions}
            handleChange={handleChange}
          />
          <DropdownMenu sortOrder={sortOrder} setSortOrder={setSortOrder} />
        </div>
      </div>
    </div>
  );
}
