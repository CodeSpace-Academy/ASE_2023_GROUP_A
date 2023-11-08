import { useEffect, useState } from "react";
import Select from "react-select";

function Ingredients({
  setFilterIngredientResults,
  handleDefaultIngredientFilter,
  setRecipes,
  selectedIngredients,
  setSelectedIngredients,
}) {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    async function fetchIngredients() {
      try {
        const response = await fetch("/api/ingredients");

        if (response.ok) {
          const data = await response.json();

          setIngredients(
            data.map((ingredient) => ({
              label: ingredient,
              value: ingredient,
            }))
          );
        } else {
          console.error("Failed to fetch ingredients");
        }
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    }

    fetchIngredients();
  }, []);

  useEffect(() => {
    const fetchRecipesByIngredients = async () => {
      if (selectedIngredients.length === 0) {
        setFilterIngredientResults([]);
      } else {
        try {
          const response = await fetch(`/api/filterbyingredient`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ selectedIngredients }),
          });

          if (response.ok) {
            const filterIngredientsResult = await response.json();
            // setRecipes(filterResult.recipes);
            setFilterIngredientResults(filterIngredientsResult.recipes);
            // setCount(filterResult.recipes.length);
          } else {
            console.error("Failed to fetch recipes by ingredients");
          }
        } catch (error) {
          console.error("Error fetching recipes by ingredients:", error);
        }
      }
    };

    if (selectedIngredients.length > 0) {
      fetchRecipesByIngredients(selectedIngredients);
    } else {
      handleDefaultIngredientFilter();
    }
  }, [selectedIngredients, setRecipes]);

  const handleIngredientChange = (selectedOptions) => {
    setSelectedIngredients(selectedOptions.map((option) => option.value));
  };

  const customStyles = {
    multiValue: (base) => ({
      ...base,
      background: "#3496c7",
      color: "white",
    }),

    control: (base) => ({
      ...base,
      backgroundColor: "#6ca9f0",
      color: "white",
      width: "fitContent",
    }),

    multiValueLabel: (base) => ({
      ...base,
      color: "white",
      fontWeight: "bold",
    }),

    placeholder: (base) => ({
      ...base,
      color: "white",
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
        options={ingredients}
        value={ingredients.filter((ingredient) =>
          selectedIngredients.includes(ingredient.value)
        )}
        onChange={handleIngredientChange}
        styles={customStyles}
        blurInputOnSelect
        placeholder="Select Ingredient"
      />
    </div>
  );
}

export default Ingredients;
