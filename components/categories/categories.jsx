import { useState, useEffect } from 'react';
import Select from 'react-select';

function Categories({ selectedCategories, setSelectedCategories }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/categories');

        if (response.ok) {
          const data = await response.json();
          setCategories(
            data[0].categories.map((category) => ({
              label: category,
              value: category,
            }))
          );
        } else {
          console.error('Failed to fetch categories');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }

    fetchCategories();
  }, []);

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions.map((option) => option.value));
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
      color: 'black',
      width: 'fitContent',
      cursor: 'pointer',

      "&:hover": { background: "lightBlue" }
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
        options={categories}
        value={categories.filter((category) =>
          selectedCategories.includes(category.value)
        )}
        onChange={handleCategoryChange}
        styles={customStyles}
        blurInputOnSelect
        placeholder="Select category"
      />
    </div>
  );
}

export default Categories;