import { connectToCollection } from "@/helpers/mongoDB-connection";
// import Recipe from './../../../components/Recipes/Recipe';

const handler = async (req, res) => {
  if (req.method === "PUT") {
    const { description } = req.body;
    const { recipeId } = req.query; // Access the recipeId from the dynamic route parameter
    try {
      const collection = await connectToCollection('devdb', 'recipes');

      const result = await collection.findOneAndUpdate(
        { _id: recipeId }, // Ensure recipeId is an ObjectId
        { $set: { description } }, // Use $set to update the description
        { returnOriginal: false }, // Set to false to return the updated document
      );

      if (result.ok && result.value) {
        res.status(200).json({ message: "Description updated successfully" });
      } else {
        res.status(404).json({ error: "Recipe not found" });
      }
    } catch (error) {
      console.error("Error updating description:", error);
      res.status(500).json({ error: "Failed to update description" });
    }
  } else if (req.method === "GET") {
    const { recipeId } = req.query;
    try {
      const collection = await connectToCollection('devdb', 'recipes');
      const recipe = await collection.findOne({ _id: recipeId });
      if (recipe) {
        // Here we return the newly updated description from mongoDB
        res.status(200).json({ description: recipe.description });
      } else {
        res.status(404).json({ error: "Recipe not found" });
      }
    } catch (err) {
      console.error("Error Fetching Description:", err);
      res.status(505).json({ err: "Failed To Fecth Description" });
    }
  } else {
    res.status(607).json({ err: "Method Not Allowed" });
  }
};

export default handler;
