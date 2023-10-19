// pages/api/description/[recipeId].js

// import { ObjectId } from "mongodb";
import { DBConnection } from "@/helpers/mongoDB-utils";
// import Recipe from './../../../components/Recipes/Recipe';

const handler = async (req, res) => {
  if (req.method === "PUT") {
    const { description } = req.body;
    const recipeId = req.query.recipeId; // Access the recipeId from the dynamic route parameter
    try {
      console.log("Recipe ID:", recipeId);
      console.log("Description:", description);

      const client = await DBConnection();
      const db = client.db("devdb");
      const collection = db.collection("recipes_edit");
      
      const result = await collection.findOneAndUpdate(
        { _id: recipeId }, // Ensure recipeId is an ObjectId
        { $set: { description: description } }, // Use $set to update the description
        { returnOriginal: false } // Set to false to return the updated document
      );

      console.log("MongoDB Update Result:", result.description);

      if (result.ok && result.value) {
        res.status(200).json({ message: "Description updated successfully" });
      } else {
        res.status(404).json({ error: "Recipe not found" });
      }
    } catch (error) {
      console.error("Error updating description:", error);
      res.status(500).json({ error: "Failed to update description" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default handler;
