import React, { useEffect, useState } from "react";
import classes from './categories.module.css'

function Categories({ handleDefault, setRecipes, }) {

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {

    async function fetchCategories() {

      try {

        const response = await fetch("/api/categories");

        if (response.ok) {

          const data = await response.json();
          setCategories(data[0].categories);

        } else {

          console.error("Failed to fetch categories");

        }

      } catch (error) {

        console.error("Error fetching categories:", error);

      }

    }

    fetchCategories();
    
  }, []);

  useEffect(() => {
    
    const fetchRecipesByCategory = async () => {

      try {

        const response = await fetch(`/api/filterbycategory`, {

          method: "POST",
          headers: {

            "Content-Type": "application/json",

          },
          body: JSON.stringify({ selectedCategory }),

        });

        if (response.ok) {

          const filterResult = await response.json();
          setRecipes(filterResult.recipes);
          setCount(filterResult.recipes.length);

        } else {

          console.error("Failed to fetch recipes by category");

        }

      } catch (error) {

        console.error("Error fetching recipes by category:", error);

      }

    };

    if (selectedCategory) {
      
      fetchRecipesByCategory(selectedCategory);

    }else{

        handleDefault()

    }

  }, [selectedCategory, setRecipes]);

  const handleCategoryChange = (e) => {

    const selected = e.target.value;
    setSelectedCategory(selected);

  };

  return (

    <div>

      <select value={selectedCategory} onChange={handleCategoryChange} className={classes.selecte}>

        <option value="" className={classes.option}>Select a category</option>

            {categories.map((category, index) => (

            <option key={index} value={category} className={classes.option}>

                {category}

            </option>

            ))}

      </select>

    </div>

  );

}

export default Categories;
