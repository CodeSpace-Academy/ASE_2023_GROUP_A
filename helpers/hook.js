const fetchRecipes = async (page) => {
  const response = await fetch(`/api/recipes?page=${page}`);

  return response;
};

export default fetchRecipes;
