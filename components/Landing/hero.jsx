import React from "react";
import PropTypes from "prop-types";
import classes from "./hero.module.css";
import SearchBar from "../searchBar/searchBar";
import Categories from "../categories/categories";
import Tags from "../tags/Tags";
import Ingredients from "../ingredients/ingredients";
import DropdownMenu from "../sort/sort";
import InstructionF from "../instructions/instructions";

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
    <div className={classes.heroImage}>
      <div className={classes.heroContent}>
        <div className={classes.search}>
          <SearchBar
            handleDefault={handleDefaultSearch}
            onSearch={onSearch}
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
          />
        </div>
        <div className={classes.filters}>
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

Hero.propTypes = {
  handleDefaultSearch: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  selectedTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedTags: PropTypes.func.isRequired,
  selectedCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedCategories: PropTypes.func.isRequired,
  selectedIngredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedIngredients: PropTypes.func.isRequired,
  selectedInstructions: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleChange: PropTypes.func.isRequired,
  setSortOrder: PropTypes.func.isRequired,
  sortOrder: PropTypes.string.isRequired,
};
