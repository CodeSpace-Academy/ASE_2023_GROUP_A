/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
/* eslint-disable radix */

/*
The code you provided is a JavaScript
module that exports a handler function.
This handler function
is used to handle a GET request and fetch a
list of recipes from a MongoDB database. */
import { getModifiedRecipesWithTotalCount } from "../../../helpers/mongoDB-utils";

/* Recipies to be rendered on each page */
const ITEMS_PER_PAGE = 100;

const handler = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { page, filters, sortOrder } = req.query;
    const decodedFilters = JSON.parse(decodeURIComponent(filters));
    console.log("FILTERS:", decodedFilters);
    console.log("SORTORDER:", sortOrder);
    console.log("INCOMIING REQUEST:", page);
    const skip = (page - 1) * ITEMS_PER_PAGE;

    const data = await getModifiedRecipesWithTotalCount(
      skip,
      JSON.stringify(filters),
      sortOrder
    );

    res.status(200).json({ data });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: "Error fetching recipes" });
  }
};

export default handler;
