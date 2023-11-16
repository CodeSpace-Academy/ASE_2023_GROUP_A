// usePersistedState.js
import { useState, useEffect } from 'react';

function usePersistedState(key, defaultValue) {
  const storedValue = typeof window !== 'undefined' ? localStorage.getItem(key) : null;
  const initial = storedValue ? JSON.parse(storedValue) : defaultValue;

  const [value, setValue] = useState(initial);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default usePersistedState;

useEffect(() => {
  // Extract query parameters from the URL
  const {
    page, tags, ingredients, categories, instructions, searchQuery, sortOrder,
  } = router.query;

  // Use the extracted query parameters to update the state
  setCurrentPage(page || 1);
  setSelectedTags(tags ? tags.split(',') : []);
  setSelectedIngredients(ingredients ? ingredients.split(',') : []);
  setSelectedCategories(categories ? categories.split(',') : []);
  setSelectedInstructions(instructions ? parseInt(instructions) : null);
  setSearchQuery(searchQuery || "");
  setSortOrder(sortOrder || null);

  // Fetch recipes based on the query parameters
  const filters = {
    page, tags, ingredients, categories, instructions, searchQuery, sortOrder,
  };
  fetchRecipesByFilters(filters);
}, [favorites]);

useEffect(() => {
  // Fetch recipes based on the query parameters when the component mounts
  const filters = {
    page: currentPage,
    tags: selectedTags,
    ingredients: selectedIngredients,
    categories: selectedCategories,
    instructions: parseInt(selectedInstructions),
    searchQuery,
  };
  fetchRecipesByFilters(filters);
}, []);
