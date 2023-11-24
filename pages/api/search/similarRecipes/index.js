// pages/api/similar-recipes/[...slug].js

import {
  getSimilarRecipes,
  getSimilarRecipesTotalCount,
  getSimilarRecipesWithTotalCount,
} from "../../../../helpers/mongoDB-utils";

const handler = async (request, response) => {
  const page =
    request.query.page && request.query.page > 0
      ? parseInt(request.query.page)
      : 1;
  const limit = 100;
  const skip = (page - 1) * limit;

  if (request.method !== "GET") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  const { recipeTitle } = request.query;
  console.log("Recipe Title:", recipeTitle);

  try {
    const { similarRecipes, totalCount } =
      await getSimilarRecipesWithTotalCount(recipeTitle, limit, skip);

    return response.status(200).json({
      similarRecipes: similarRecipes,
      totalSimilarRecipes: totalCount,
    });
  } catch (error) {
    console.error("Error fetching similar recipes:", error);
    return response.status(500).json({ error: "Internal server error" });
  }
};

export default handler;