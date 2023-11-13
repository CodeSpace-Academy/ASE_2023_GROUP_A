import { useEffect, useState } from 'react';
import Select from 'react-select';

function Ingredients({ selectedIngredients, setSelectedIngredients }) {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    async function fetchIngredients() {
      try {
        const response = await fetch('/api/ingredients');

        if (response.ok) {
          const data = await response.json();

          setIngredients(
            data.map((ingredient) => ({
              label: ingredient,
              value: ingredient,
            }))
          );
        } else {
          console.error('Failed to fetch ingredients');
        }
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    }

    fetchIngredients();
  }, []);

  const handleIngredientChange = (selectedOptions) => {
    setSelectedIngredients(selectedOptions.map((option) => option.value));
  };

  const customStyles = {
    multiValue: (base) => ({
      ...base,
      background: 'red',
      color: 'white',
      
    }),

    control: (base) => ({
      ...base,
      backgroundColor: '#007bff',
      color: 'white',
      width: 'fitContent',
      cursor: 'pointer',

      "&:hover": { background: "lightBlue"}
    }),

    multiValueLabel: (base) => ({
      ...base,
      color: 'white',
      fontWeight: 'bold',
    }),

    placeholder: (base) => ({
      ...base,
      color: 'white',
      
    }),

    menu: (base) => ({
      ...base,
      width: '12em',
     
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
        placeholder="Select ingredient"
      />
    </div>
  );
}

export default Ingredients;