const fetchRecipes = async ({setRecipes, setOriginalRecipes, setTotalRecipes, setLoading}) => {
    try {
      const response = await fetch(`/api/recipes?page=1`);
      if (response.ok) {
        
        const fetchedRecipes = await response.json();
        
        setRecipes(fetchedRecipes.recipes);
        setOriginalRecipes(fetchedRecipes.recipes)
        setTotalRecipes(fetchedRecipes.totalRecipes);
        setLoading(false); // Set loading to false when data is fetched

      } else {
        console.error("Failed to fetch recipes");
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  export default fetchRecipes