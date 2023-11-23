// pages/api/similar-recipes/[...slug].js
import { getSimilarRecipes } from "../../../../helpers/mongoDB-utils";

const handler = async (request, response) => {
  if (request.method !== "GET") {
    return response.status(405).json({ error: "Method not allowed" });
  }
  const { recipeTitle } = request.query;
  console.log("similar Recipes Title:", recipeTitle);
  try {
    const similarRecipes = await getSimilarRecipes(recipeTitle);
    console.log("similar Recipes:", similarRecipes);
    return response.status(200).json({ similarRecipes });
  } catch (error) {
    console.error("Error fetching similar recipes:", error);
    return response.status(500).json({ error: "Internal server error" });
  }
};

export default handler;
