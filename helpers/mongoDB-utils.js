import {
  connectToCollection,
  closeMongoDBConnection,
  client,
} from "./mongoDB-connection";

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
    const allergens = allergensDocument.allergens;
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
    const favoritesCollection = client.db("devdb").collection("favorites"); // Create or use a 'favorites' collection
    // Check if the user's favorite already exists
    const existingFavorite = await favoritesCollection.findOne({
      _id: recipe._id,
    });
    if (existingFavorite) {
      // Handle the case where the favorite already exists

      return;
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

export async function searching(searchQuery) {
  const recipesCollection = client.db("devdb").collection("recipes");

  const query = {
    $or: [{ title: { $regex: searchQuery, $options: "i" } }],
  };

  const searchResult = recipesCollection.find(query).limit(100).toArray();
  return searchResult;
}

export async function filteringByInstructions(selectedInstructions) {
  try {
    const collection = client.db("devdb").collection("recipes");

    const query = { instructions: { $size: selectedInstructions } };

    const filterInstructionsResults = await collection
      .find(query)
      .limit(100)
      .toArray();

    return filterInstructionsResults;
  } catch (error) {
    console.error("Error filtering recipes by instructions:", error);
    throw error;
  }
}

export async function filteringByCategory(selectedCategories) {
  const recipesCollection = client.db("devdb").collection("recipes");

  const query = {};

  if (selectedCategories && selectedCategories.length > 0) {
    query.category = { $in: selectedCategories };
  }

  const filterResult = await recipesCollection.find(query).limit(100).toArray();

  return filterResult;
}

export async function filteringByIngredient(selectedIngredients) {
  const recipesCollection = client.db("devdb").collection("recipes");

  const query = {};

  if (selectedIngredients && selectedIngredients.length > 0) {
    query.$or = selectedIngredients.map((ingredient) => ({
      [`ingredients.${ingredient}`]: { $exists: true },
    }));
  }

  try {
    const filterIngredientsResult = await recipesCollection
      .find(query)
      .limit(100)
      .toArray();

    return filterIngredientsResult;
  } catch (error) {
    console.error("Error filtering recipes by ingredients:", error);
    throw error;
  }
}

export async function filteringByTags(selectedTags) {
  const recipesCollection = client.db("devdb").collection("recipes");

  const query = {};

  if (selectedTags) {
    query.tags = { $all: selectedTags };
  }

  const filterResult = await recipesCollection.find(query).limit(100).toArray();
  return filterResult;
}

export async function handleUpdateInstructions(recipeId, updatedInstruction) {
  const db = client.db("devdb");
  const collection = db.collection("recipes");

  try {
    await collection.updateOne(
      { _id: recipeId },
      {
        $set: { instructions: updatedInstruction },
      }
    );

    return { success: true, message: "Instruction updated successfully" };
  } catch (error) {
    console.error("Database update error:", error);
    throw error;
  }
}
