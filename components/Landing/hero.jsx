import React, { useState } from "react";
import { FaFilter, FaTimes } from "react-icons/fa";
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
  onAutocomplete,
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
  handleSort,
  sortOrder,
}) {
  const [filtersVisible, setFiltersVisible] = useState(true);

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  return (
    <div className={classes.heroImage}>
      <div className={classes.heroContent}>
        <div className={classes.search}>
          <SearchBar
            handleDefault={handleDefaultSearch}
            onSearch={onSearch}
            onAutocomplete={onAutocomplete}
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
          />
        </div>
        <div className={classes.filters}>
          <>
            <Categories
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
            <Tags
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />
            <Ingredients
              selectedIngredients={selectedIngredients}
              setSelectedIngredients={setSelectedIngredients}
            />
            <InstructionF
              selectedInstructions={selectedInstructions}
              handleChange={handleChange}
            />
            <DropdownMenu handleSort={handleSort} sortOrder={sortOrder} />
          </>
        </div>
      </div>
    </div>
  );
}