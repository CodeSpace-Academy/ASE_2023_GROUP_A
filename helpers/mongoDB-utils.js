import { MongoClient, ServerApiVersion } from "mongodb";

// MongoDB connection URI, including authentication details
const uri = `mongodb+srv://groupa:${process.env.mongodb_password}@${process.env.mongodb_username}.uyuxme9.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoDB client instance with specific server API version and options
export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Function to connect to the MongoDB server and return a collection
export const connectToCollection = async (databaseName, collectionName) => {
  try {
    await client.connect();

    const db = client.db(databaseName);
    const collection = db.collection(collectionName);
    return collection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

// Function to close the MongoDB connection
export async function closeMongoDBConnection() {
  await client.close();
}

// Fetch all recipes with optional skip and limit parameters
export const getAllRecipes = async (skip, limit) => {
  const collection = client.db("devdb").collection("recipes");
  const query = collection.find();
  query.skip(skip).limit(limit);
  try {
    const recipes = await query.toArray();
    return recipes;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};

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
    console.error("Error fetching unique tags:", error);
    throw error;
  }
}

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
    console.error("Error fetching unique ingredients:", error);
    throw error;
  }
}

export async function getCategories() {
  const categoriesCollection = client.db("devdb").collection("categories");

  const categories = categoriesCollection.find().toArray();

  return categories;
}

// Fetch recipe data from MongoDB based on the recipe title and collection
export const fetchRecipeDataFromMongo = async (recipeName) => {
  try {
    const collection = client.db("devdb").collection("recipes");
    const recipeData = collection.findOne({ title: recipeName });
    return recipeData;
  } catch (error) {
    console.error("Error fetching recipe data from MongoDB:", error);
    throw error;
  }
};

export const fetchAllergens = async () => {
  try {
    const db = client.db("devdb");
    const allergensDocument = await db.collection("allergens").findOne({});
    const { allergens } = allergensDocument;
    return allergens;
  } catch (error) {
    console.error("Error fetching allergens:", error);
    throw error;
  }
};

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

    if (countResult.length > 0) {
      return countResult[0].count;
    }
    return 0; // No documents found, return 0
  } catch (error) {
    console.error("Error fetching total recipes count:", error);
    throw error;
  }
};

// Function to add a favorite recipe to MongoDB
export const addFavoriteToMongoDB = async (recipe) => {
  try {
    const favoritesCollection = client.db("devdb").collection("favorites"); // Create or use a 'favorites' collection
    // Check if the user's favorite already exists
    const existingFavorite = await favoritesCollection.findOne({
      _id: recipe._id,
    });
    if (existingFavorite) {
      // Handle the case where the favorite already exists

    } else {
      // If the favorite doesn't exist, insert it into the collection
      const result = await favoritesCollection.insertOne({
        _id: recipe._id,
        recipe,
      });
      return result;
    }
  } catch (error) {
    console.error("Error adding favorite to MongoDB:", error);
    throw error;
  }
};

export const removeFavoriteFromDB = async (recipeId) => {
  try {
    const favoritesCollection = client.db("devdb").collection("favorites");
    const deleteResult = await favoritesCollection.deleteOne({ _id: recipeId });
    return deleteResult;
  } catch (err) {}
};

export const getFavouritesFromMongoDB = async () => {
  const collection = client.db("devdb").collection("favorites");
  const data = collection.find();
  try {
    const recipes = await data.toArray();
    return recipes;
  } catch (error) {
    console.error("Error fetching favourites:", error);
    throw error;
  }
};

export async function searchSuggestions(searchQuery) {
  const recipesCollection = client.db("devdb").collection("recipes");

  const autocompleteResults = recipesCollection
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
}

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
  } else if (sortOrder === "steps(asc)") {
    sortCriteria = { "instructions.length": 1 };
  } else if (sortOrder === "preptime(asc)") {
    sortCriteria = { prep: 1 };
  } else if (sortOrder === "preptime(desc)") {
    sortCriteria = { prep: -1 };
  } else if (sortOrder === "steps(desc)") {
    sortCriteria = { "instructions.length": -1 };
  }

  const result = await collection
    .find(query)
    .sort(sortCriteria)
    .limit(100)
    .toArray();

  return result;
}
