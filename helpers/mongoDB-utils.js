import { MongoClient, ServerApiVersion } from "mongodb";
const uri =
  `mongodb+srv://groupa:${process.env.mongodb_password}@${process.env.mongodb_username}.uyuxme9.mongodb.net/?retryWrites=true&w=majority`;

export const client = new MongoClient(uri, {
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
export const getAllRecipes = async (
  client,
  skip,
  limit
) => {
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

export const fetchRecipeDataFromMongo = async (recipeName,collection) => {
  try {
    // Establish a connection to MongoDB and select your database and collection
    const client = await DBConnection();
    const db = client.db("devdb");
    const collec = db.collection(collection);
    // Query for the recipe using the provided recipeId
    const recipeData = await collec.findOne({ title: recipeName });
    return recipeData; // Return the retrieved recipe data
  } catch (error) {
    console.error("Error fetching recipe data from MongoDB:", error);
    throw error;
  }finally {
    client.close()
    }
};

export const generateDynamicPaths = async () => {
  try {
    const client = await DBConnection();
    const recipes = await getAllRecipes(client, 0, 5);
    const dynamicPaths = recipes.map((recipe) => ({
      params: { recipeName: recipe.title },
    }));
    console.log('Client Closed')
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
    console.log('Client Close')
    return fetchedCategories;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

export const getTotalRecipesCount = async (client) => {
  try {
    const db = client.db('devdb'); // Get the MongoDB database
    const recipesCollection = db.collection("recipes"); // Change this to your actual collection name
    // Use the aggregation framework to count the documents
    const countResult = await recipesCollection.aggregate([
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
        },
      },
    ]).toArray();
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

