import { MongoClient, ServerApiVersion } from "mongodb";

const uri = `mongodb+srv://groupa:${process.env.mongodb_password}@${process.env.mongodb_username}.uyuxme9.mongodb.net/?retryWrites=true&w=majority
`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function DBConnection() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

export async function getTags() {
  const db = client.db("devdb");
  const collection = db.collection("recipes");

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

export const getAllRecipes = async (client, skip, limit) => {
  const db = client.db("devdb");
  const collection = db.collection("recipes");

  try {
    const recipes = await collection.find({}).skip(skip).limit(limit).toArray();
    return recipes;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};

export const fetchRecipeDataFromMongo = async (
  client,
  recipeName,
  collection
) => {
  try {
    const db = client.db("devdb");
    const collec = db.collection(collection);
    const recipeData = collec.findOne({ title: recipeName });
    return recipeData;
  } catch (error) {
    console.error("Error fetching recipe data from MongoDB:", error);
    throw error;
  }
};

export const generateDynamicPaths = async (client) => {
  try {
    const db = client.db("devdb");
    const recipes = await getAllRecipes(client, 0, 5, "recipes");

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

export const getTotalRecipesCount = async (client) => {
  try {
    const db = client.db("devdb");
    const recipesCollection = db.collection("recipes");

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

export async function searchSuggestions(searchQuery) {
  const db = client.db("devdb");
  const recipesCollection = db.collection("recipes");

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

export async function searching(searchQuery, selectedCategories) {
  const db = client.db("devdb");
  const recipesCollection = db.collection("recipes");

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

export async function filteringByCategory(
  selectedCategories,
  searchQuery,
  selectedTags
) {
  const db = client.db("devdb");
  const recipesCollection = db.collection("recipes");

  const query = {};

  if (selectedCategories && selectedCategories.length > 0) {
    query.category = { $in: selectedCategories };
  }

  if (selectedTags) {
    query.tags = { $in: selectedTags };
  }

  if (searchQuery) {
    query.$or = [{ title: { $regex: searchQuery, $options: "i" } }];
  }

  const filterResult = await recipesCollection.find(query).limit(100).toArray();

  return filterResult;
}

export async function filteringByTags(
  selectedCategories,
  selectedTags,
  searchQuery
) {
  const db = client.db("devdb");
  const recipesCollection = db.collection("recipes");

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

export async function getCategories() {
  const db = client.db("devdb");
  const categoriesCollection = db.collection("categories");
  const categories = categoriesCollection.find().toArray();
  return categories;
}

// export async function getNumberOfSteps() {
//   const db = client.db("devdb");
//   const stepsCollection = db.collection("instructions")
//   const steps = stepsCollection.find().toArray();
//   return steps;
// }

//  export async function filteringBySteps(
//   selectedCategories,
//   searchQuery,
//   selectedTags,
//   enteredNumber,
// ) {
//   const db = client.db("devdb");
//   const recipesCollection = db.collection("recipes");

//   const query = {};

//   if (enteredNumber) {
//     query.instructions = { $in: enteredNumber}
//   }

//   if (selectedCategories && selectedCategories.length > 0) {
//     query.category = { $in: selectedCategories };
//   }

//   if (selectedTags) {
//     query.tags = { $in: selectedTags };
//   }

//   if (searchQuery) {
//     query.$or = [{ title: { $regex: searchQuery, $options: "i" } }];
//   }

//   const filterResult = await recipesCollection.find(query).limit(100).toArray();

//   return filterResult;
// }
