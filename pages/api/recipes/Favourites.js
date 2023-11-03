import {
  addFavoriteToMongoDB,
  getFavouritesFromMongoDB,
  removeFavoriteFromDB,
} from "@/helpers/mongoDB-utils";

const handler = async (request, response) => {
  if (request.method === "GET") {
    try {
      // Retrieve the user's favorite recipes from MongoDB.
      const FavesData = await getFavouritesFromMongoDB();
      response.status(200).json({ favorites: FavesData });
    } catch (error) {
      console.error("Error fetching favorite recipes:", error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  } else if (request.method === "POST") {
    const recipe = request.body;
    try {
      // Add a favorite recipe to MongoDB
      const results = await addFavoriteToMongoDB(recipe);
      if (results) {
        response.status(201).json({ message: "Recipe added to favorites" });
      } else {
        response.status(500).json({ error: "Internal Server Error" });
      }
    } catch (error) {
      console.error("Error adding favorite to MongoDB:", error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  } else if (request.method === "DELETE") {
    const { recipeId } = request.body;
    try {
      // Remove the recipeId from the user's favorites collection in MongoDB
      const result = await removeFavoriteFromDB(recipeId);
      if (result.deletedCount === 1 || result.acknowledged) {
        response.status(200).json({ message: "Recipe removed from favorites" });
      } else {
        response.status(404).json({ error: "Recipe not found in favorites" });
      }
    } catch (error) {
      console.error("Error removing favorite from MongoDB:", error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    response.status(405).json({ error: "Method not allowed" });
  }
};

export default handler;
