const RecipeDetailTags = ({ recipe }) => {
    try {
      
      if (!recipe) {
        return <div>Loading please wait...</div>;
      }
  
      // Display tags for the recipe
      return (
        <>
          <ul className="list-disc list-inside">
            {recipe.tags.map((tag, index) => (
              <li key={index} className="text-gray-600">
                {tag}
              </li>
            ))}
          </ul>
        </>
      );
    } catch (error) {
      // Handle and log errors that occur during tag rendering
      console.error("An error occurred:", error);
      return <div>Failed to load tags!</div>;
    }
  };

  export default RecipeDetailTags