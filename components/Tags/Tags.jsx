const Tags = ({ recipe }) => {
  try {
    // If no recipe data is available, display a loading message
    if (!recipe) {
      return <div>Loading please wait...</div>;
    }

    // Display tags for the recipe
    return (
      <>
        <h3 className="mt-2 text-lg font-semibold">Tags:</h3>
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

export default Tags;
