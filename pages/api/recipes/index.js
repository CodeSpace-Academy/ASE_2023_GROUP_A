/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
/* eslint-disable radix */

/*
The code you provided is a JavaScript
module that exports a handler function.
This handler function
is used to handle a GET request and fetch a
list of recipes from a MongoDB database. */
import { getAllRecipes, getTotalRecipesCount } from "../../../helpers/mongoDB-utils";

/* Recipies to be rendered on each page */
const ITEMS_PER_PAGE = 100;

const handler = async (req, res) => {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const skip = (page - 1) * ITEMS_PER_PAGE;
    const [recipesData, totalRecipes] = await Promise.all([
      getAllRecipes(skip, ITEMS_PER_PAGE),
      await getTotalRecipesCount(), // Fetch the total number of recipes
    ]);
    res.status(200).json({ recipes: recipesData, totalRecipes });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(408).json({ error: "Error fetching recipes" });
  }
};

export default handler;
