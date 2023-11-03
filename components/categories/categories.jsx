import React, { useEffect, useState } from "react";
import Select from "react-select";

function Categories({setFilterCategoryResults, handleDefaultCategoryFilter, setRecipes }) {

  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {

    async function fetchCategories() {

      try {

        const response = await fetch("/api/categories");

        if (response.ok) {

          const data = await response.json();
          setCategories(data[0].categories.map(category => ({ label: category, value: category })));
          
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
    
    const fetchRecipesByCategories = async () => {

      if (selectedCategories.length === 0) {

        setFilterCategoryResults([]);

      } else {

        try {

          const response = await fetch(`/api/filterbycategory`, {

            method: "POST",
            headers: {

              "Content-Type": "application/json",

            },
            body: JSON.stringify({ selectedCategories }),

          });

          if (response.ok) {

            const filterResult = await response.json();
            // setRecipes(filterResult.recipes);
            setFilterCategoryResults(filterResult.recipes)
            // setCount(filterResult.recipes.length);

          } else {

            console.error("Failed to fetch recipes by category");

          }

        } catch (error) {

          console.error("Error fetching recipes by category:", error);

        }

      };

    }

    if (selectedCategories.length > 0) {

      fetchRecipesByCategories(selectedCategories);

    } else {

      handleDefaultCategoryFilter();

    }

  }, [selectedCategories, setRecipes]);

  const handleCategoryChange = (selectedOptions) => {

    setSelectedCategories(selectedOptions.map(option => option.value));

  };

  const customStyles = {

    multiValue: (base) => ({

      ...base,
      background: "red",
      color: "white",
      

    }),

    control: (base) => ({

      ...base,
      backgroundColor: "#999",
      color: "white",
      width: 'fitContent',

    }),

    multiValueLabel: (base) => ({
      ...base,
      color: "white",
      fontWeight: "bold",
    }),

    placeholder: (base) => ({

      ...base,
      color: "black",
      fontWeight: "600"

    }),

    menu: (base) => ({

      ...base,
      width: "12em",

    }),

    
  };

  return (

    <div>


      <Select
        isMulti
        options={categories}
        value={categories.filter(category => selectedCategories.includes(category.value))}
        onChange={handleCategoryChange}
        styles={customStyles}
        blurInputOnSelect
        placeholder="select category"
        
      />

    </div>

  );

}

export default Categories;
