import {
  connectToCollection,
  closeMongoDBConnection,
} from "@/helpers/mongoDB-connection";

const updateInstructionsInDB = async (id, instructions, request) => {
  try {
    const collection = await connectToCollection("devdb", "recipes");

    if (request.method === "PATCH") {
      const result = await collection.updateOne(
        { _id: id },
        { $set: { instructions: instructions } }
      );

      if (result.matchedCount > 0) {
        return {
          success: true,
          message: `Instructions for '${id}' were successfully updated.`,
        };
      }

      if (result.deletedCount > 0) {
        return {
          success: true,
          message: `Document with ID '${id}' was successfully deleted.`,
        };
      }
    } else {
      return { success: false, message: "Method not allowed." };
    }
  } catch (error) {
    return {
      success: false,
      message: `Error updating instructions: ${error.message}`,
    };
  } finally {
    await closeMongoDBConnection();
  }
};

export default handler;
