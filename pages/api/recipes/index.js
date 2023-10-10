// api/recipes.js (API route for fetching recipes with pagination)

import { getAllRecipes, DBConnection } from "../../../helpers/mongoDB-utils";

const ITEMS_PER_PAGE = 100; //Recipies to be rendered on each page

const handler = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    let client = await DBConnection();
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const skip = (page - 1) * ITEMS_PER_PAGE;
    const recipesData = await getAllRecipes(client, skip, ITEMS_PER_PAGE);
    res.status(200).json({ recipes: recipesData });
    client.close();
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(408).json({ error: "Error fetching recipes" });
  }
};
export const getTotalRecipesCount = async (client) => {
  try {
    const db = client.db(); // Get the MongoDB database
    const recipesCollection = db.collection("recipes"); // Change this to your actual collection name

    // Use the .countDocuments() method to count the total number of documents in the collection
    const totalRecipes = await recipesCollection.countDocuments();
    return totalRecipes;
  } catch (error) {
    console.error("Error fetching total recipes count:", error);
    throw error;
  }
};
export default handler;
