import { MongoClient, ServerApiVersion } from "mongodb";

// MongoDB connection URI, including authentication details
let uri;

try {
  if (!process.env.mongodb_username || !process.env.mongodb_password)
    throw new Error("Some files missing!");
  uri = `mongodb+srv://groupa:${process.env.mongodb_password}@${process.env.mongodb_username}.uyuxme9.mongodb.net/?retryWrites=true&w=majority`;
} catch (error) {
  console.log("Setiings: ", error);
}

// Create a MongoDB client instance with specific server API version and options
export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Establish a connection to the MongoDB server
export const DBConnection = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

// Fetch all recipes with optional skip and limit parameters
export const getAllRecipes = async (client, skip, limit) => {
  try {
    const db = await client.db("devdb");
    const allRecipes = await db
      .collection("recipes")
      .find({})
      .skip(skip)
      .limit(limit)
      .toArray(); // Convert to an array for easier iteration
    return allRecipes;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};

// Fetch recipe data from MongoDB based on the recipe title and collection
export const fetchRecipeDataFromMongo = async (recipeName, collection) => {
  try {
    const client = await DBConnection();
    const db = client.db("devdb");
    const collec = db.collection(collection);
    const recipeData = await collec.findOne({ title: recipeName });
    return recipeData;
  } catch (error) {
    console.error("Error fetching recipe data from MongoDB:", error);
    throw error;
  }
};
export const fetchRecipeDataFromMongoById = async (recipeId,collection) => {
  try {
    // Establish a connection to MongoDB and select your database and collection
    const client = await DBConnection();
    const db = client.db("devdb");
    const collec = db.collection(collection);
    // Query for the recipe using the provided recipeId
    const recipeData = await collec.findOne({ _id: recipeId });
    return recipeData; // Return the retrieved recipe data
  } catch (error) {
    console.error("Error fetching recipe data from MongoDB:", error);
    throw error;
  }
};

// Generate dynamic paths for Next.js based on recipe titles
export const generateDynamicPaths = async () => {
  try {
    const client = await DBConnection();
    const recipes = await getAllRecipes(client, 0, 5);
    const dynamicPaths = recipes.map((recipe) => ({
      params: { recipeName: recipe.title },
    }));
    console.log("Client Closed");
    return dynamicPaths;
  } catch (error) {
    console.error("Error generating dynamic paths:", error);
    throw error;
  }
};

// Fetch all categories from MongoDB
export const getAllCategories = async (client) => {
  try {
    const db = client.db("devdb");
    const categoriesDocument = await db.collection("categories").findOne({});
    const categories = categoriesDocument.categories;
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

// Fetch categories using the DBConnection function
export const fetchCategories = async () => {
  try {
    const client = await DBConnection();
    const fetchedCategories = await getAllCategories(client);
    console.log("Client Close");
    return fetchedCategories;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

// Get the total count of recipes in the MongoDB collection
export const getTotalRecipesCount = async (client) => {
  try {
    const db = client.db('devdb'); // Get the MongoDB database
    const recipesCollection = db.collection("recipes"); // Change this to your actual collection name
    // Use the aggregation framework to count the documents
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
    } else {
      return 0; // No documents found, return 0
    }
  } catch (error) {
    console.error("Error fetching total recipes count:", error);
    throw error;
  }
};

// fetching allergens from MongoDB

export const getAllAllergens = async (client) => {
  try {
    const db = client.db("devdb");
    const allergensDocument = db.collection("allergens");
    const allergens = await allergensDocument.findOne({});
    return allergens.allergens;
  } catch (error) {
    console.error("Error fetching allergens:", error);
    throw error;
  }
};

export const fetchAllergens = async () => {
  try {
    const client = await DBConnection();
    const fetchedAllergens = await getAllAllergens(client);

    return fetchedAllergens;
  } catch (error) {
    console.error("Error fetching allergens:", error);
    return null;
  }
};
