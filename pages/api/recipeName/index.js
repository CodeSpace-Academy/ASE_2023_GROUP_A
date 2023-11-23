import {
  connectToCollection,
  closeMongoDBConnection,
} from "../../../helpers/mongoDB-connection";
import {
  fetchRecipeDataFromMongo,
  fetchAllergens,
} from "../../../helpers/mongoDB-utils";

const handler = async (req, res) => {
  try {
    const { recipeName } = req.query;
    const collection = await connectToCollection("devdb", "recipes");
    const recipeData = await fetchRecipeDataFromMongo(collection, recipeName);
    const allergens = await fetchAllergens();
    await closeMongoDBConnection();
    if (!recipeData) {
      res.status(404).json({ error: "Recipe not found" });
    } else {
      res.status(200).json({ recipe: recipeData, allergens });
    }
  } catch (error) {
    console.error("Error fetching recipe data:", error);
    res.status(500).json({ error: "Error fetching recipe data" });
  }
};

export default handler;
