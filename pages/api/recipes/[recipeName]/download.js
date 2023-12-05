// pages/api/recipes/download/[recipeId]/[format].js

import { downloadRecipe } from "../../../../helpers/mongoDB-utils";

export default async function handler(req, res) {
  const { recipeId, format } = req.query;

  try {
    // Call a utility function to handle the download
    await downloadRecipe(res, recipeId, format);
  } catch (error) {
    console.error("Error downloading recipe:", error);
    res.status(500).json({ error: "Error downloading recipe" });
  }
}
