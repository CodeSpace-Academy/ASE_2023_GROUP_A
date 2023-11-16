// const fetchRecipes = async (page) => {
//   const response = await fetch(`/api/recipes?page=${page}`);
//   return response;
// };

// export default fetchRecipes;

const fetchRecipes = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch recipes");
  }
  return response.json();
};

export default fetchRecipes;
