// pages/api/recipes/download/[recipeId]/[format].js

import { downloadRecipe } from "../../../helpers/mongoDB-utils";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return;
  }
  const { recipeId, format } = req.query;
  // console.log("INCOMING REQUEST:", req);
  try {
    await downloadRecipe(res, recipeId, format);
  } catch (error) {
    console.error("Error downloading recipe:", error);
    res.status(500).json({ error: "Error downloading recipe" });
  }
}
