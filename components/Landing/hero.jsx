import React from "react";
import classes from "./hero.module.css";
import SearchBar from "../searchBar/searchBar";
import Categories from "../categories/categories";

export default function Hero({handleDefault,setRecipes, onSearch, onAutocomplete }) {

  return (

    <div className={classes.heroImage}>

      <div className={classes.heroContent}>

        <div>

          <SearchBar handleDefault={handleDefault} onSearch={onSearch} onAutocomplete={onAutocomplete} />

        </div>

        <Categories setRecipes={setRecipes} handleDefault={handleDefault}/>

      </div>

    </div>

  );
  
}
