import React from "react";
import classes from "./hero.module.css";
import SearchBar from "../searchBar/searchBar";
import Categories from "../categories/categories";
import Tags from "../Tags/Tags";

export default function Hero({
  setFilterCategoryResults,
  setFilterTagsResults,
  handleDefaultCategoryFilter,
  handleDefaultTagFilter,
  handleDefaultSearch,
  setRecipes,
  onSearch,
  onAutocomplete,
  setSearchQuery,
  searchQuery,
}) {
  return (
    <div className={classes.heroImage}>
      <div className={classes.heroContent}>
        <div>
          <SearchBar
            handleDefault={handleDefaultSearch}
            onSearch={onSearch}
            onAutocomplete={onAutocomplete}
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
          />
        </div>

        <Categories
          setFilterCategoryResults={setFilterCategoryResults}
          setRecipes={setRecipes}
          handleDefaultCategoryFilter={handleDefaultCategoryFilter}
        />

        <Tags
          setFilterTagsResults={setFilterTagsResults}
          setRecipes={setRecipes}
          handleDefaultTagFilter={handleDefaultTagFilter}
        />
      </div>
    </div>
  );
}
