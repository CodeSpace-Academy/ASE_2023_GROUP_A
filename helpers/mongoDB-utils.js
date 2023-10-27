import { MongoClient, ServerApiVersion } from "mongodb";

// MongoDB connection URI, including authentication details
const uri = process.env.MONGODB_URI;

// Create a MongoDB client instance with specific server API version and options
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Connect to the MongoDB server only once and store the client instance
export async function DBConnection() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

// Call the connectToMongoDB function when your application starts
// const client = await DBConnection(); 

// Fetch all recipes with optional skip and limit parameters
export const getAllRecipes = async (client, skip, limit, ) => {
  const db = client.db('devdb');
  let query = db.collection('recipes').find();
  query.limit(limit);

  try {
    const recipes = await query.toArray();
    return recipes;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};

// Fetch recipe data from MongoDB based on the recipe title and collection
export const fetchRecipeDataFromMongo = async (client, recipeName, collection) => {
  try {
    // const client = await DBConnection()
    const db = client.db('devdb');
    const collec = db.collection(collection);
    const recipeData = collec.findOne({ title: recipeName });
    return recipeData;
  } catch (error) {
    console.error("Error fetching recipe data from MongoDB:", error);
    throw error;
  }
};

// Fetch recipe data from MongoDB based on the recipe ID and collection
// export const fetchRecipeDataFromMongoById = async (client, recipeId) => {
//   try {
//     const db = client.db('devdb');
//     const collec = db.collection('recipes');
//     const recipeData = collec.findOne({ _id: recipeId });
//     return recipeData;
//   } catch (error) {
//     console.error("Error fetching recipe data from MongoDB:", error);
//     throw error;
//   }
// };

// Generate dynamic paths for Next.js based on recipe titles
export const generateDynamicPaths = async (client) => {
  try {
    const db = client.db('devdb');
    const recipes = await getAllRecipes(client, 0, 5, 'recipes');
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
export const getAllCategories = async () => {
  try {
    const db = client.db();
    const categoriesDocument = db.collection("categories").findOne({});
    const categories = categoriesDocument.categories;
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const fetchAllergens = async () => {
  try {
    const db = client.db('devdb');
    const allergensDocument = await db.collection("allergens").findOne({});
    const allergens = allergensDocument.allergens;
    return allergens;
  } catch (error) {
    console.error("Error fetching allergens:", error);
    throw error;
  }
};


export const getTotalRecipesCount = async (client) => {
  try {
    const db = client.db('devdb'); // Get the MongoDB database
    const recipesCollection = db.collection('recipes'); // Change this to your actual collection name
    // Use the aggregation framework to count the documents
    const countResult = recipesCollection
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