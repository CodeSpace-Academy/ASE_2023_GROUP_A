import { MongoClient, ServerApiVersion } from "mongodb";
const uri = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_username}.uyuxme9.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

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
  }
};

export const fetchRecipeDataFromMongo = async (recipeName, collection) => {
  try {
    // Establish a connection to MongoDB and select your database and collection
    const client = await DBConnection();
    const db = client.db("devdb");
    const collec = db.collection(collection);

    // Query for the recipe using the provided recipeId
    const recipeData = await collec.findOne({ title: recipeName });
    // Close the MongoDB connection
    client.close();
    return recipeData; // Return the retrieved recipe data
  } catch (error) {
    console.error("Error fetching recipe data from MongoDB:", error);
    throw error;
  }
};

export const generateDynamicPaths = async () => {
  try {
    const client = await DBConnection();
    const recipes = await getAllRecipes(client, 0, 5);
    const dynamicPaths = recipes.map((recipe) => ({
      params: { recipeName: recipe.title },
    }));
    return dynamicPaths;
  } catch (error) {
    console.error("Error generating dynamic paths:", error);
    throw error;
  }
};

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

export const fetchCategories = async () => {
  try {
    const client = await DBConnection();
    const fetchedCategories = await getAllCategories(client);
    console.log(fetchedCategories);
    client.close();
    return fetchedCategories;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};
