import { getAllRecipes, getTotalRecipesCount } from "@/helpers/mongoDB-utils";

const ITEMS_PER_PAGE = 100;

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const page =
      req.query.page && req.query.page > 0 ? parseInt(req.query.page) : 1;
    const skip = (page - 1) * ITEMS_PER_PAGE;

    const [recipesData, totalRecipes] = await Promise.all([
      getAllRecipes(skip, ITEMS_PER_PAGE),
      getTotalRecipesCount(),
    ]);

    res.status(200).json({ recipes: recipesData, totalRecipes });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: "Error fetching recipes" });
  }
}