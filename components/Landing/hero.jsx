import React from "react";
import classes from "./hero.module.css";
import SearchBar from "../searchBar/searchBar";
import Categories from "../categories/categories";
import Tags from "../tags/tags";
import Ingredients from "../ingredients/ingredients";
import DropdownMenu from "../sort/sort";
// import handleFilterInstruction from '../Instructions/filterInstructions'
import InstructionF from "../instructions/instructions";

export default function Hero({
  setFilterCategoryResults,
  setFilterTagsResults,
  setFilterIngredientResults,
  setFilterInstructionsResults,
  handleDefaultCategoryFilter,
  handleDefaultIngredientFilter,
  handleDefaultTagFilter,
  handleDefaultSearch,
  ff,
  setRecipes,
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
  setI,
  handleSort,
  sortOrder,
}) {
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
          <Categories
            setFilterCategoryResults={setFilterCategoryResults}
            setRecipes={setRecipes}
            handleDefaultCategoryFilter={handleDefaultCategoryFilter}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />

          <Tags
            setFilterTagsResults={setFilterTagsResults}
            setRecipes={setRecipes}
            handleDefaultTagFilter={handleDefaultTagFilter}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />

          <Ingredients
            setFilterIngredientResults={setFilterIngredientResults}
            setRecipes={setRecipes}
            handleDefaultIngredientFilter={handleDefaultIngredientFilter}
            selectedIngredients={selectedIngredients}
            setSelectedIngredients={setSelectedIngredients}
          />

          {/* <InstructionF
            ff={ff}
            setFilterInstructionsResults={setFilterInstructionsResults}
            setRecipes={setRecipes}
            
            selectedInstructions={selectedInstructions}
            setI={setI}
           /> */}

          <DropdownMenu handleSort={handleSort} sortOrder={sortOrder} />
        </div>
      </div>
    </div>
  );
}
