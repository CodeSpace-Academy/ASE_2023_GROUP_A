import { connectToCollection, closeMongoDBConnection } from "./mongoDB-connection";

// Fetch all recipes with optional skip and limit parameters
export const getAllRecipes = async (limit) => {
  const collection = await connectToCollection('devdb', 'recipes');
  const query = collection.find();
  query.limit(limit);
  try {
    const recipes = await query.toArray();
    return recipes;
    
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

// Fetch recipe data from MongoDB based on the recipe title and collection
export const fetchRecipeDataFromMongo = async (collection,recipeName) => {
  try {
    const recipeData = await collection.findOne({ title: recipeName }); 
    console.log(recipeData)
    return recipeData;
  } catch (error) {
    console.error("Error fetching recipe data from MongoDB:", error);
    throw error;
  } finally {
    closeMongoDBConnection();
  }
};


// Fetch all categories from MongoDB
export const getAllCategories = async () => {
  try {
     const collection = await connectToCollection('devdb', 'categories');
    const categoriesDocument = collection.findOne({});
    const categories = categoriesDocument.categories;
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  } finally {
    closeMongoDBConnection();
  }
};

export const fetchAllergens = async () => {
  try {
    const collection = await connectToCollection('devdb', 'allergens');
    const allergensDocument = await collection.findOne({});
    const allergens = allergensDocument.allergens;
    return allergens;
  } catch (error) {
    console.error("Error fetching allergens:", error);
    throw error;
  } finally {
    closeMongoDBConnection();
  }
};

export const getTotalRecipesCount = async () => {
  try {
    const recipesCollection = await connectToCollection('devdb', 'recipes'); // Change this to your actual collection name
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
  } finally {
    closeMongoDBConnection();
  }
};

// Function to add a favorite recipe to MongoDB
export const addFavoriteToMongoDB = async (recipe) => {

  try {
    const favoritesCollection = await connectToCollection('devdb', 'favorites'); // Create or use a 'favorites' collection
    // Check if the user's favorite already exists
    const existingFavorite = await favoritesCollection.findOne({ _id: recipe._id });
    if (existingFavorite) {
      // Handle the case where the favorite already exists
      console.log("Favorite already exists.");
      return;
    } else {
      // If the favorite doesn't exist, insert it into the collection
      await favoritesCollection.insertOne({ _id: recipe._id, recipe });
      console.log("Favorite added to MongoDB.");
    }
  } catch (error) {
    console.error("Error adding favorite to MongoDB:", error);
    throw error;
  } finally {
   closeMongoDBConnection(); // Close the MongoDB connection
  }
};

export const removeFavoriteFromDB = async (recipeId) => {
  try {
    const favoritesCollection = await connectToCollection("devdb", "favorites");
    const deleteResult = await favoritesCollection.deleteOne({ _id: recipeId });
    console.log("DELETED:",deleteResult)
    return deleteResult;
  } catch (err) { }finally{closeMongoDBConnection();}
};

export const getFavouritesFromMongoDB = async () => {
  const collection = await connectToCollection("devdb", "favorites");
  const data = collection.find();
    try {
      const recipes = await data.toArray();
      return recipes;
    } catch (error) {
      console.error("Error fetching favourites:", error);
      throw error;
    } finally {
      closeMongoDBConnection();
    }
}