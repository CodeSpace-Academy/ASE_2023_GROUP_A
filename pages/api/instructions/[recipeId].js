const { MongoClient } = require("mongodb");

const updateInstructionsInDB = async (id, instructions) => {
  const uri = `mongodb+srv://groupa:${process.env.mongodb_password}@${process.env.mongodb_username}.uyuxme9.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db("devdb");
    const collection = database.collection("recipes");

    if (request.method === "PATCH") {
      const result = await collection.updateOne(
        { _id: id }, // Your identifier for the recipe document
        { $set: { instructions: instructions } } // Update instructions field
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
    await client.close();
  }
};

module.exports = { updateInstructionsInDB };
