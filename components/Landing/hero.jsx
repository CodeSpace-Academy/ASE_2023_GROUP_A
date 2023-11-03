import React from "react";
import classes from "./hero.module.css";
import SearchBar from "../searchBar/searchBar";
import Categories from "../categories/categories";

export default function Hero({

  setFilterResults,
  handleDefaultFilter,
  handleDefaultSearch,
  setRecipes,
  onSearch,
  onAutocomplete,

}) {
  return (

    <div className={classes.heroImage}>

      <div className={classes.heroContent}>

        <div>

          <SearchBar
            handleDefault={handleDefaultSearch}
            onSearch={onSearch}
            onAutocomplete={onAutocomplete}
          />

        </div>

        <Categories
          setFilterResults={setFilterResults}
          setRecipes={setRecipes}
          handleDefault={handleDefaultFilter}
        />
       
      </div>
      
    </div>

  );

}
