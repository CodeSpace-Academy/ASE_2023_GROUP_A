import { addFavoriteToMongoDB } from "@/helpers/mongoDB-utils";

const handler = async (request, response) => {
  if (request.method === "POST") {
    const recipe = request.body;
console.log(recipe)
    const postFavourites = async () => {
      try {
        const results = await addFavoriteToMongoDB(recipe);
        return results;
      } catch (error) {
        console.error("Error adding favorite to MongoDB:", error);
        throw error;
      }
    };

    try {
      const favouritesAdded = await postFavourites();
      response.status(202).json({ favouritesAdded });
    } catch (error) {
      response.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    response.status(405).json({ error: "Method not allowed" });
  }

  // api/favorites/remove.js
  // Remove a recipe from favorites
  // You can use your MongoDB connection code here

  if (request.method === "POST") {
    const { recipeId } = request.body;
    // Remove the recipeId from the user's favorites collection in MongoDB.
    // Don't forget to handle errors and authentication.
    // Return a success response.
  } else {
    response.status(405).json({ error: "Method not allowed" });
  }

  // api/favorites/view.js
  // Retrieve user's favorite recipes
  // You can use your MongoDB connection code here

  if (request.method === "GET") {
    // Retrieve the user's favorite recipes from MongoDB.
    // Don't forget to handle errors and authentication.
    // Return the list of favorite recipes.
  } else {
    response.status(405).json({ error: "Method not allowed" });
  }
};
export default handler;
