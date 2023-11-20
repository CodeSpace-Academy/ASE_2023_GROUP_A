import {
  connectToCollection,
  // closeMongoDBConnection,
} from "@/helpers/mongoDB-connection";

const updateInstructionsInDB = async (request, result) => {
  if (request.method === "PATCH") {
    const { instructions } = request.body;
    const { recipeId } = request.query;
    try {
      const collection = await connectionToCollection("devdb", "recipes");
      const updateResult = await collection.findOneAndUpdate(
        { _id: recipeId },
        { $set: { instructions } }, // Add a comma here
        { returnOriginal: false },
      );

      if (updateResult.ok && updateResult.value) {
        result.status(200).json({ message: `Instructions for '${recipeId}' were successfully updated.` });
      } else {
        result.status(404).json({ error: "Error updating instructions" });
      }
    } catch (error) {
      console.error("Updating instructions failed", error);
      result.status(500).json({ error: "Error updating instructions" });
    }
  } else if (request.method === "GET") {
    const { recipeId } = request.query;
    try {
      const collection = await connectToCollection("devdb", "recipes");
      const recipe = await collection.findOne({ _id: recipeId });
      if (recipe) {
        result.status(200).json({ instructions: recipe.instructions });
      } else {
        result.status(404).json({ error: "Recipe not found" });
      }
    } catch (error) {
      console.error("Couldn't connect to instructions", error);
      result.status(505).json({ error: "Couldn't connect to instructions" });
    }
  } else {
    result.status(607).json({ error: "Couldn't connect to instructions" });
  }
};

export default updateInstructionsInDB;
