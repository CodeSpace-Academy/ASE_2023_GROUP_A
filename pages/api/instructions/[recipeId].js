import {
  connectToCollection,
  closeMongoDBConnection,
} from "@/helpers/mongoDB-connection";
const updateInstructionsInDB = async (request, id, instructions) => {
  try {
    const collection = await connectToCollection("devdb", "recipes");

    if (request.method === "PATCH") {
      console.log("Testing :", _id, instructions);

      const result = await collection.updateOne(
        { _id: id },
        { $set: { instructions: instructions } }
      );

      if (result.matchedCount > 0) {
        console.log(`Instructions for '${id}' were successfully updated.`);
      } else {
        console.log(`No document found with ID '${id}'.`);
      }
    } else if (request.method === "DELETE") {
      const result = await collection.deleteOne({ _id: id });

      if (result.deletedCount > 0) {
        console.log(`Document with ID '${id}' was successfully deleted.`);
      } else {
        console.log(`No document found with ID '${id}'.`);
      }
    } else {
      console.log("Method not allowed.");
    }
  } catch (error) {
    console.error("Error updating instructions:", error);
  } finally {
    await closeMongoDBConnection();
  }
};

module.exports = { updateInstructionsInDB };
