// pages/api/similar-recipes/[...slug].js
import { getSimilarRecipesWithTotalCount } from "../../../../helpers/mongoDB-utils";

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
  const { filters, sortOrder, searchQuery } = request.body || {}; // Get filters and sortOrder from the request body

  try {
    let similarRecipes, totalCount;

    if (filters || searchQuery) {
      // If filters or searchQuery exist, apply them
      const result = await getSimilarRecipesWithTotalCount(
        recipeTitle,
        limit,
        skip,
        searchQuery,
        filters,
        sortOrder
      );
      similarRecipes = result.similarRecipes;
      totalCount = result.totalCount;
    } else {
      // If no filters or searchQuery, fetch all recipes without filtering
      const result = await getSimilarRecipesWithTotalCount(
        recipeTitle,
        limit,
        skip
      );
      similarRecipes = result.similarRecipes;
      totalCount = result.totalCount;
    }

    // console.log(
    //   "SIMILAR RECIPES FROM API:",
    //   similarRecipes,
    //   "TOTAL RECIPES:",
    //   totalCount
    // );

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
