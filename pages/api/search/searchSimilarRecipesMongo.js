// pages/api/searchSimilarRecipesMongo.js
import { getSimilarRecipesWithTotalCount } from "../../../helpers/mongoDB-utils";

const handler = async (request, response) => {
  if (request.method !== "GET") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  const {
    recipeTitle, searchQuery, page, tag, category, sortOrder,
  } = request.query;
  const filters = {
    category,
    tag,
  };

  try {
    const limit = 100;
    const skip = (page - 1) * limit;

    const result = await getSimilarRecipesWithTotalCount(
      recipeTitle,
      skip,
      searchQuery,
      sortOrder,
      filters,
    );

    return response.status(200).json({
      similarRecipes: result.similarRecipes,
      totalSimilarRecipes: result.totalCount,
    });
  } catch (error) {
    // console.error("Error fetching similar recipes:", error);
    return response.status(500).json({ error: "Internal server error" });
  }
};

export default handler;
