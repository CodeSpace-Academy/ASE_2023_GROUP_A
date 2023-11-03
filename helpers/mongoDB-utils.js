import { connectToCollection, closeMongoDBConnection } from "./mongoDB-connection";

// Fetch all recipes with optional skip and limit parameters
export const getAllRecipes = async (limit) => {
  const collection = await connectToCollection("devdb", "recipes");
  const query = collection.find();
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
export const fetchRecipeDataFromMongo = async (collection,recipeName) => {
  try {
    const recipeData = await collection.findOne({ title: recipeName });
    closeMongoDBConnection();
    return recipeData;
  } catch (error) {
  closeMongoDBConnection();
    console.error("Error fetching recipe data from MongoDB:", error);
    throw error;
  } 
};


// Fetch all categories from MongoDB
export const getAllCategories = async () => {
  try {
     const collection = await connectToCollection('devdb', 'categories');
    const categoriesDocument = collection.findOne({});
    const categories = categoriesDocument.categories;
    closeMongoDBConnection();
    return categories;
  } catch (error) {
    closeMongoDBConnection();
    console.error("Error fetching categories:", error);
    throw error;
  } 
};

export const fetchAllergens = async () => {

  try {
    const collection = await connectToCollection('devdb', 'allergens');
    const allergensDocument = await collection.findOne({});
    const allergens = allergensDocument.allergens;
    closeMongoDBConnection();
    return allergens;
  } catch (error) {
    closeMongoDBConnection();
    console.error("Error fetching allergens:", error);
    throw error;
  }

};

export const getTotalRecipesCount = async () => {
  try {
    const recipesCollection = await connectToCollection("devdb", "recipes"); // Change this to your actual collection name
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
  } 
};

export const removeFavoriteFromDB = async (recipeId) => {
  try {
    const favoritesCollection = await connectToCollection("devdb", "favorites");
    const deleteResult = await favoritesCollection.deleteOne({ _id: recipeId });
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
    }
}



export async function searchSuggestions(searchQuery){

  const recipesCollection = await connectToCollection("devdb", "recipes");

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

    return autocompleteResults
}

export async function searching(searchQuery, selectedCategories) {
  const recipesCollection = await connectToCollection("devdb", "recipes");

  // Create a query that considers both search and categories
  const query = {
    $or: [{ title: { $regex: searchQuery, $options: "i" } }],
  };

  if (selectedCategories && selectedCategories.length > 0) {
    query.category = { $in: selectedCategories };
  }

  const searchResult = recipesCollection.find(query).limit(100).toArray();
  return searchResult;
}


export async function filtering(selectedCategories, searchQuery,) {

  const recipesCollection = await connectToCollection("devdb", "recipes");

  const query = {};

  if (selectedCategories && selectedCategories.length > 0) {
    query.category = { $in: selectedCategories };
  }


  if (searchQuery) {
    query.$or = [{ title: { $regex: searchQuery, $options: "i" } }];
  }

  const filterResult = recipesCollection.find(query).limit(100).toArray();
  return filterResult;
}



export async function getCategories(){

  const categoriesCollection = await connectToCollection("devdb", "categories");

  const categories = categoriesCollection.find().toArray();
  return categories
}

export async function getTags() {
  const collection = await connectToCollection("devdb", "recipes");

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

export async function filteringByTags(
  selectedCategories,
  selectedTags,
  searchQuery
) {
  const recipesCollection = await connectToCollection("devdb", "recipes");

  const query = {};

  if (selectedTags) {
    query.tags = { $in: selectedTags };
  }

  if (selectedCategories && selectedCategories.length > 0) {
    query.category = { $in: selectedCategories };
  }

  if (searchQuery) {
    query.$or = [{ title: { $regex: searchQuery, $options: "i" } }];
  }

  const filterResult = await recipesCollection.find(query).limit(100).toArray();
  return filterResult;
}
