// api/recipes.js (API route for fetching recipes with pagination)
import { getAllRecipes, DBConnection, getTotalRecipesCount } from "../../../helpers/mongoDB-utils";

const ITEMS_PER_PAGE = 100; //Recipies to be rendered on each page
const handler = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    let client = await DBConnection();
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const skip = (page - 1) * ITEMS_PER_PAGE;
    const [recipesData, totalRecipes] = await Promise.all([
      getAllRecipes(client, skip, ITEMS_PER_PAGE),
      //removed console.log(recipe)
     await getTotalRecipesCount(client) // Fetch the total number of recipes
    ]);
    res.status(200).json({ recipes: recipesData, totalRecipes });
    client.close();
  } catch (error) {
    client.close();
    console.error("Error fetching recipes:", error);
    res.status(408).json({ error: "Error fetching recipes" });
  }
};

export default handler;
