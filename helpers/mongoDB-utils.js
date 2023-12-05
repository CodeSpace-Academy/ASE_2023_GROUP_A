/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable new-cap */
import { MongoClient, ServerApiVersion } from "mongodb";
import { PDFDocument } from "pdf-lib";
import * as XLSX from "xlsx";

const uri = process.env.mongodb_uri;

/**
 * MongoDB client for connecting to the database.
 * @type {MongoClient}
 */
export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

/**
 * Connects to the specified collection in the MongoDB database.
 *
 * @param {string} databaseName - The name of the database.
 * @param {string} collectionName - The name of the collection.
 * @returns {Promise<Collection>} - A promise that resolves to the connected collection.
 */
export const connectToCollection = async (databaseName, collectionName) => {
  await client.connect();

  const db = client.db(databaseName);
  const collection = db.collection(collectionName);
  return collection;
};

/**
 * Closes the MongoDB connection.
 *
 * @returns {Promise<void>} - A promise that resolves when the connection is closed.
 */
export async function closeMongoDBConnection() {
  await client.close();
}

/**
 * Retrieves all recipes with optional skip and limit parameters.
 *
 * @param {number} skip - The number of documents to skip.
 * @param {number} limit - The maximum number of documents to return.
 * @returns {Promise<Object[]>} - A promise that resolves to an array of recipes.
 */
export const getAllRecipes = async (skip, limit) => {
  const collection = client.db("devdb").collection("recipes");
  const query = collection.find();
  query.skip(skip).limit(limit);
  try {
    const recipes = await query.toArray();
    return recipes;
  } catch (error) {
    throw new Error("could not fetch recipes");
  }
};

/**
 * Retrieves all tags from the recipes collection.
 *
 * @returns {Promise<string[]>} - A promise that resolves to an array of tags.
 */
export async function getTags() {
  const collection = client.db("devdb").collection("recipes");

  try {
    const tags = await collection
      .aggregate([
        { $unwind: "$tags" },
        { $group: { _id: "$tags" } },
        { $project: { _id: 0, tag: "$_id" } },
      ])
      .toArray();

    return tags.map((tagObj) => tagObj.tag);
  } catch (error) {
    throw new Error("could not fetch tags");
  }
}

/**
 * Retrieves all unique ingredients from the recipes collection.
 *
 * @returns {Promise<string[]>} - A promise that resolves to an array of unique ingredients.
 */
export async function getIngredients() {
  const collection = client.db("devdb").collection("recipes");

  try {
    const ingredients = await collection
      .aggregate([
        {
          $project: {
            ingredients: {
              $objectToArray: "$ingredients",
            },
          },
        },
        {
          $unwind: "$ingredients",
        },
        {
          $group: {
            _id: null,
            uniqueIngredients: {
              $addToSet: "$ingredients.k",
            },
          },
        },
        {
          $project: {
            _id: 0,
            uniqueIngredients: 1,
          },
        },
      ])
      .toArray();

    return ingredients[0].uniqueIngredients;
  } catch (error) {
    throw new Error("could not fetch ingredients");
  }
}

/**
 * Retrieves all categories from the categories collection.
 *
 * @returns {Promise<Object[]>} - A promise that resolves to an array of categories.
 */
export async function getCategories() {
  const categoriesCollection = client.db("devdb").collection("categories");

  try {
    const categories = await categoriesCollection.find().toArray();
    return categories;
  } catch (error) {
    throw new Error("could not fetch categories");
  }
}

/**
 * Fetches recipe data from MongoDB based on the recipe title.
 *
 * @param {string} recipeName - The title of the recipe.
 * @returns {Promise<Object>} - A promise that resolves to the recipe data.
 */
export const fetchRecipeDataFromMongo = async (recipeName) => {
  try {
    const collection = client.db("devdb").collection("recipes");
    const recipeData = await collection.findOne({ title: recipeName });
    return recipeData;
  } catch (error) {
    throw new Error("could not fetch recipe details by id");
  }
};

/**
 * Retrieves allergens from the allergens collection.
 *
 * @returns {Promise<string[]>} - A promise that resolves to an array of allergens.
 */
export const fetchAllergens = async () => {
  try {
    const db = client.db("devdb");
    const allergensDocument = await db.collection("allergens").findOne({});
    const { allergens } = allergensDocument;
    return allergens;
  } catch (error) {
    throw new Error("could not fetch allergens");
  }
};

/**
 * Retrieves the total count of recipes in the recipes collection.
 *
 * @returns {Promise<number>} - A promise that resolves to the total count of recipes.
 */
export const getTotalRecipesCount = async () => {
  try {
    const recipesCollection = client.db("devdb").collection("recipes");

    const countResult = await recipesCollection
      .aggregate([
        {
          $group: {
            _id: null,
            count: { $sum: 1 },
          },
        },
      ])
      .toArray();

    return countResult.length > 0 ? countResult[0].count : 0;
  } catch (error) {
    throw new Error("could not fetch total count of recipes fetched");
  }
};

/**
 * Adds a favorite recipe to MongoDB.
 *
 * @param {Object} recipe - The recipe object to add to favorites.
 * @returns {Promise<Object>} - A promise that resolves to the result of the insertion.
 */
export const addFavoriteToMongoDB = async (recipe) => {
  try {
    const favoritesCollection = client.db("devdb").collection("favorites"); // Create or use a 'favorites' collection
    // Check if the user's favorite already exists
    const existingFavorite = await favoritesCollection.findOne({
      _id: recipe._id,
    });
    if (existingFavorite) {
      // Handle the case where the favorite already exists
      throw new Error("could not add recipe to favorites");
    } else {
      // If the favorite doesn't exist, insert it into the collection
      const result = await favoritesCollection.insertOne({
        _id: recipe._id,
        recipe,
      });
      return result;
    }
  } catch (error) {
    throw new Error("could not add recipe to favorites");
  }
};

/**
 * Removes a favorite recipe from MongoDB.
 *
 * @param {string} recipeId - The ID of the recipe to remove from favorites.
 * @returns {Promise<Object>} - A promise that resolves to the result of the deletion.
 */
export const removeFavoriteFromDB = async (recipeId) => {
  try {
    const favoritesCollection = client.db("devdb").collection("favorites");
    const deleteResult = await favoritesCollection.deleteOne({ _id: recipeId });
    return deleteResult;
  } catch (err) {
    throw new Error("could not remove recipe from favorites");
  }
};

/**
 * Retrieves favorite recipes from MongoDB.
 *
 * @returns {Promise<Object[]>} - A promise that resolves to an array of favorite recipes.
 */
export const getFavouritesFromMongoDB = async () => {
  try {
    const collection = client.db("devdb").collection("favorites");
    const recipes = await collection.find().toArray();
    return recipes;
  } catch (error) {
    throw new Error("could not fetch favorites");
  }
};

/**
 * Retrieves search suggestions based on the provided search query.
 *
 * @param {string} searchQuery - The search query.
 * @returns {Promise<Object[]>} - A promise that resolves to an array of search suggestions.
 */
export async function searchSuggestions(searchQuery) {
  const recipesCollection = client.db("devdb").collection("recipes");

  try {
    const autocompleteResults = await recipesCollection
      .find({
        $or: [
          { title: { $regex: searchQuery, $options: "i" } },
          { description: { $regex: searchQuery, $options: "i" } },
        ],
      })
      .limit(5)
      .project({ title: 1 })
      .toArray();

    return autocompleteResults;
  } catch (error) {
    throw new Error(
      "could not fetch suggestions based on the search query provided",
    );
  }
}

/**
 * Filters recipes based on the provided filters and sort order.
 *
 * @param {Object} filters - The filters to apply.
 * @param {string} sortOrder - The sort order.
 * @returns {Promise<Object[]>} - A promise that resolves to an array of filtered and sorted
 * recipes.
 */
export async function filtering(filters, sortOrder) {
  const {
    searchQuery, tags, ingredients, categories, instructions,
  } = filters;

  const db = client.db("devdb");
  const collection = db.collection("recipes");

  const query = {};

  if (searchQuery && searchQuery.length > 0) {
    query.$or = [{ title: { $regex: searchQuery, $options: "i" } }];
  }

  if (categories && categories.length > 0) {
    query.category = { $all: categories };
  }

  if (tags && tags.length > 0) {
    query.tags = { $all: tags };
  }

  if (ingredients && ingredients.length > 0) {
    const ingredientQueries = ingredients.map((ingredient) => ({
      [`ingredients.${ingredient}`]: { $exists: true },
    }));
    query.$and = ingredientQueries;
  }

  if (instructions) {
    query.instructions = { $size: instructions };
  }

  let sortCriteria = {};

  if (sortOrder === "[A-Z]") {
    sortCriteria = { title: 1 };
  } else if (sortOrder === "[Z-A]") {
    sortCriteria = { title: -1 };
  } else if (sortOrder === "Oldest") {
    sortCriteria = { published: 1 };
  } else if (sortOrder === "Recent") {
    sortCriteria = { published: -1 };
  } else if (sortOrder === "cooktime(asc)") {
    sortCriteria = { cook: 1 };
  } else if (sortOrder === "cooktime(desc)") {
    sortCriteria = { cook: -1 };
  } else if (sortOrder === "preptime(asc)") {
    sortCriteria = { prep: 1 };
  } else if (sortOrder === "preptime(desc)") {
    sortCriteria = { prep: -1 };
  } else if (sortOrder === "steps(desc)" || sortOrder === "steps(asc)") {
    const sortOrderValue = sortOrder === "steps(desc)" ? -1 : 1;
    try {
      const result = await collection
        .aggregate([
          { $match: query },
          {
            $project: {
              title: 1,
              instructions: 1,
              prep: 1,
              cook: 1,
              images: 1,
              sortOrder: { $size: "$instructions" },
            },
          },
          { $sort: { sortOrder: sortOrderValue } },
          {
            $project: {
              title: 1,
              instructions: 1,
              prep: 1,
              cook: 1,
              images: 1,
            },
          },
        ])
        .limit(100)
        .toArray();

      return result;
    } catch (error) {
      throw new Error(
        "could not filter recipes according to the filters selected",
      );
    }
  }

  try {
    const result = await collection
      .find(query)
      .sort(sortCriteria)
      .limit(100)
      .toArray();

    return result;
  } catch (error) {
    throw new Error(
      "could not filter recipes according to the filters selected",
    );
  }
}

export const getSimilarRecipesWithTotalCount = async (
  recipeTitle,
  skip,
  searchQuery,
  sortOrder,
  filters = {},
) => {
  try {
    const cl = await client.connect();
    const db = cl.db("devdb");
    const collection = db.collection("recipes");
    const { tag, category } = filters;

    // Check if favoriteRecipe is null
    const favoriteRecipe = await collection.findOne({ title: recipeTitle });
    if (!favoriteRecipe) {
      return { similarRecipes: [], totalCount: 0 };
    }

    // Initialize the query object
    const query = {};

    // Add category condition if it exists
    // Add category condition if it exists
    if (
      category
      && (Array.isArray(category) ? category.length > 0 : category)
    ) {
      query.category = {
        $all: Array.isArray(category) ? category : [category],
      };
    }

    // Add tag condition if it exists
    if (tag && (Array.isArray(tag) ? tag.length > 0 : tag)) {
      query.tags = { $all: Array.isArray(tag) ? tag : [tag] };
    }

    // Initialize sortCriteria

    // Ensure that favoriteRecipe.tags is an array
    const tags = Array.isArray(favoriteRecipe.tags)
      ? favoriteRecipe.tags
      : [favoriteRecipe.tags];

    const categoryQuery = Array.isArray(favoriteRecipe.category)
      ? { category: { $in: favoriteRecipe.category } }
      : { category: favoriteRecipe.category };

    const baseQuery = {
      $or: [
        { tags: { $in: tags } },
        categoryQuery,
        // You can add more complete conditions based on your requirements
      ],
      title: { $ne: favoriteRecipe.title }, // Exclude the favorite recipe itself
    };

    // If searchQuery exists, add it to the base query for fuzzy search
    const regexSearchQuery = searchQuery
      ? {
        $or: [
          { title: { $regex: new RegExp(searchQuery, "i") } },
          { description: { $regex: new RegExp(searchQuery, "i") } },
          { tags: { $regex: new RegExp(searchQuery, "i") } },
          { ingredients: { $regex: new RegExp(searchQuery, "i") } },
        ],
      }
      : {};

    // Merge the baseQuery, regexSearchQuery, and additional query conditions
    const finalQuery = {
      ...baseQuery,
      ...regexSearchQuery,
      ...query,
    };

    let sortCriteria = {};

    // Handle sort order based on sortOrder value
    if (sortOrder === "default") {
      sortCriteria = {};
    } else if (sortOrder === "A-Z") {
      sortCriteria = { title: 1 };
    } else if (sortOrder === "Z-A") {
      sortCriteria = { title: -1 };
    } else if (sortOrder === "Oldest") {
      sortCriteria = { published: 1 };
    } else if (sortOrder === "Recent") {
      sortCriteria = { published: -1 };
    } else if (sortOrder === "cooktime(asc)") {
      sortCriteria = { cook: 1 };
    } else if (sortOrder === "cooktime(desc)") {
      sortCriteria = { cook: -1 };
    } else if (sortOrder === "preptime(asc)") {
      sortCriteria = { prep: 1 };
    } else if (sortOrder === "preptime(desc)") {
      sortCriteria = { prep: -1 };
    } else if (sortOrder === "steps(desc)") {
      sortCriteria = { instructions: -1 };
    } else if (sortOrder === "steps(asc)") {
      sortCriteria = { instructions: 1 };
    }
    const similarRecipes = await collection
      .find(finalQuery)
      .sort(sortCriteria)
      .limit(100)
      .skip(skip)
      .toArray();

    const totalCount = await collection.find(finalQuery).count();

    return { similarRecipes, totalCount };
  } catch (error) {
    return error;
  }
};

export const getModifiedRecipesWithTotalCount = async (
  skip,
  sortOrder,
  filters = {},
) => {
  try {
    const cl = await client.connect();
    const db = cl.db("devdb");
    const collection = db.collection("recipes");

    const {
      searchQuery, tags, ingredients, categories, instructions,
    } = filters;

    const query = {};

    // Handle search query
    if (searchQuery && searchQuery.length > 0) {
      const fuzzySearchQuery = {
        $or: [
          { title: { $regex: searchQuery, $options: "i" } },
          { description: { $regex: searchQuery, $options: "i" } },
          { tags: { $regex: searchQuery, $options: "i" } },
          { ingredients: { $regex: searchQuery, $options: "i" } },
        ],
      };

      // Combine fuzzy search with existing conditions
      if (query.$and) {
        query.$and.push(fuzzySearchQuery);
      } else {
        query.$and = [fuzzySearchQuery];
      }
    }

    // Handle category filter
    if (categories && categories.length > 0) {
      const categoryFilter = { category: { $all: categories } };
      if (query.$and) {
        query.$and.push(categoryFilter);
      } else {
        query.$and = [categoryFilter];
      }
    }

    // Handle tag filter
    if (tags && tags.length > 0) {
      const tagFilter = { tags: { $all: tags } };
      if (query.$and) {
        query.$and.push(tagFilter);
      } else {
        query.$and = [tagFilter];
      }
    }

    // Handle ingredient filter
    if (ingredients && ingredients.length > 0) {
      const ingredientQueries = ingredients.map((ingredient) => ({
        [`ingredients.${ingredient}`]: { $exists: true },
      }));
      if (query.$and) {
        query.$and.push({ $or: ingredientQueries });
      } else {
        query.$and = [{ $or: ingredientQueries }];
      }
    }

    // Handle instructions filter
    if (instructions) {
      query.instructions = { $size: instructions };
    }

    let sortCriteria = {};

    // Handle sort order based on sortOrder value
    if (sortOrder === "[A-Z]") {
      sortCriteria = { title: 1 };
    } else if (sortOrder === "[Z-A]") {
      sortCriteria = { title: -1 };
    } else if (sortOrder === "Oldest") {
      sortCriteria = { published: 1 };
    } else if (sortOrder === "Recent") {
      sortCriteria = { published: -1 };
    } else if (sortOrder === "cooktime(asc)") {
      sortCriteria = { cook: 1 };
    } else if (sortOrder === "cooktime(desc)") {
      sortCriteria = { cook: -1 };
    } else if (sortOrder === "preptime(asc)") {
      sortCriteria = { prep: 1 };
    } else if (sortOrder === "preptime(desc)") {
      sortCriteria = { prep: -1 };
    } else if (sortOrder === "steps(desc)") {
      sortCriteria = { instructions: -1 };
    } else if (sortOrder === "steps(asc)") {
      sortCriteria = { instructions: 1 };
    }

    // Execute the query and fetch total count
    const [recipes, totalCount] = await Promise.all([
      collection.find(query)
        .sort(sortCriteria)
        .limit(100)
        .skip(skip)
        .toArray(),
      collection.find(query).count(),
    ]);

    return { recipes, totalCount };
  } catch (error) {
    return error;
  }
};

/**
 * Format recipe data as plain text.
 * @param {Object} recipeData - The recipe data to format.
 * @returns {string} - The recipe content in plain text.
 */
const formatRecipeAsPlainText = (recipeData) => {
  // Implement your logic to format recipe data as plain text
  // For example, you can iterate over recipeData and create a string representation
  let plainTextContent = `Recipe: ${recipeData.title}\n\n`;
  plainTextContent += `Description: ${recipeData.description}\n\n`;
  plainTextContent += 'Ingredients:\n';
  // Iterate over ingredients and add them to the plain text content
  Object.entries(recipeData.ingredients).forEach(([ingredient, quantity]) => {
    plainTextContent += `${ingredient}: ${quantity}\n`;
  });
  // Add more sections as needed
  return plainTextContent;
};
const formatRecipeAsExcel = (recipeData) => {
  // Define columns for Excel sheet
  const columns = [
    "Title",
    "Description",
    "Prep Time",
    "Cook Time",
    "Category",
    "Servings",
    "Published",
    // Add more columns as needed
  ];

  // Extract values for each column
  const values = [
    recipeData.title,
    recipeData.description,
    recipeData.prep,
    recipeData.cook,
    recipeData.category,
    recipeData.servings,
    recipeData.published,
    // Add more values as needed
  ];

  // Create an Excel sheet
  const ws = XLSX.utils.json_to_sheet([columns, values], { skipHeader: true });

  // Create a workbook
  const wb = XLSX.utils.book_new();

  // Append the sheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, "Recipe");

  // Generate Excel Blob
  const excelBlob = XLSX.write(wb, { bookType: "xlsx", type: "blob" });

  return excelBlob;
};

const formatRecipeAsPdf = async (recipeData) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const { height } = page.getSize();

  // Access properties directly from the recipeData object
  page.drawText(`Title: ${recipeData.title}`, { x: 10, y: height - 20 });
  page.drawText(`Description: ${recipeData.description}`, {
    x: 10,
    y: height - 40,
  });
  page.drawText(`Prep Time: ${recipeData.prep} minutes`, {
    x: 10,
    y: height - 60,
  });
  page.drawText(`Cook Time: ${recipeData.cook} minutes`, {
    x: 10,
    y: height - 80,
  });
  page.drawText(`Category: ${recipeData.category}`, { x: 10, y: height - 100 });
  page.drawText(`Servings: ${recipeData.servings}`, { x: 10, y: height - 120 });
  page.drawText(`Published: ${recipeData.published}`, {
    x: 10,
    y: height - 140,
  });

  // Add more content as needed
  // ...

  // Save the PDF to a Blob
  const pdfBytes = await pdfDoc.save();

  // Log the PDF as a Blob for debugging
  console.log(
    "DOWNLOADABLE RECIPE PDF:",
    new Blob([pdfBytes], { type: "application/pdf" }),
  );

  return pdfBytes;
};
/**
 * Convert recipe data to the specified format.
 * @param {Object} recipeData - The recipe data to convert.
 * @param {string} format - The desired format ('json' or 'text').
 * @returns {string} - The recipe content in the specified format.
 */
// export const convertRecipeToFormat = (recipeData, format) => {
//   switch (format) {
//     case "json":
//       console.log("RECIPE CONVERTED TO JSON:", recipeData);
//       return JSON.stringify(recipeData, null, 2); // Prettified JSON with 2-space indentation
//     case "text":
//       console.log("RECIPE CONVERTED TO text:", recipeData);
//       return formatRecipeAsPlainText(recipeData); // Implement this function for text format
//     // Add more cases for other formats if needed
//     case "xml":
//       return formatRecipeAsExcel(recipeData); // Implement this function for XML format
//     case "html":
//       return formatRecipeAsHtml(recipeData);
//     default:
//       throw new Error(`Unsupported format: ${format}`);
//   }
// };
// Helper function to get content type based on format
const getContentType = (format) => {
  switch (format) {
    case "json":
      return "application/json";
    case "text":
      return "text/plain";
    case "pdf":
      return "application/pdf";
    case "excel":
      return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    default:
      return "application/octet-stream";
  }
};
export const fetchRecipeDataFromMongoById = async (recipeId) => {
  try {
    const collection = client.db("devdb").collection("recipes");

    // Convert the recipeId to UUID
    const uuid = recipeId; // Assuming recipeId is already a string in UUID format

    const recipeData = await collection.findOne({ _id: uuid });
    return recipeData;
  } catch (error) {
    throw new Error("Could not fetch recipe details by ID");
  }
};

export const downloadRecipe = async (res, recipeId, format) => {
  try {
    // Fetch recipe data from MongoDB
    const recipeData = await fetchRecipeDataFromMongoById(recipeId);
    console.log("DOWNLOADABLE RECIPE:", recipeData);
    // Check if recipe data is available
    if (!recipeData) {
      res.status(404).json({ error: "Recipe not found" });
      return;
    }

    // Check if the requested format is supported
    if (!["json", "text", "pdf", "excel"].includes(format)) {
      res.status(400).json({ error: "Unsupported format" });
      return;
    }

    // Implement logic to convert recipeData to the specified format
    let recipeContent;

    switch (format) {
      case "json":
        recipeContent = JSON.stringify(recipeData, null, 2);
        break;
      case "text":
        recipeContent = formatRecipeAsPlainText(recipeData);
        break;
      case "pdf": {
        recipeContent = await formatRecipeAsPdf(recipeData);
        break;
      }

      case "excel": {
        // Format recipe data as Excel
        recipeContent = await formatRecipeAsExcel(recipeData);
        break;
      }
      default:
        throw new Error(`Unsupported format: ${format}`);
    }

    // Set appropriate headers for download
    res.setHeader("Content-Type", getContentType(format));
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=recipe_${recipeId}.${format}`,
    );

    // Send the recipe content as the response
    res.end(recipeContent);
    res.send(recipeContent);
  } catch (error) {
    console.error("Error downloading recipe:", error);
    res.status(500).json({ error: "Error downloading recipe" });
  }
};
