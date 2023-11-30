import { MongoClient, ServerApiVersion } from "mongodb";

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
    const existingFavorite = await favoritesCollection.findOne({ _id: recipe._id });
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
    throw new Error("could not fetch suggestions based on the search query provided");
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
