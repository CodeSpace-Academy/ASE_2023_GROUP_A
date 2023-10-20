import { DBConnection } from "../../../helpers/mongoDB-utils";

const handler = async (request, response) => {
  const id = request.query.recipeId;
  const { instructions } = request.body;
  if (request.method === "PUT") {
    try {
      const client = await DBConnection();
      const db = client.db("devdb");
      const collection = db.collection("recipes_edit");
      const results = await collection.findOneAndUpdate(
        { _id: id },
        { $set: { instructions: instructions } }
        );
        console.log(results.instructions)
      client.close();
      if (results.ok && results.value) {
        response.status(201).json({
          message: `Instructions For:['${id}'] was successfully uploaded.`,
        });
        console.log(`Instructions For:['${id}'] was successfully uploaded.`);
      }
    } catch (error) {
      console.error("Error updating Instructions:", error);
      response.status(500).json({ error: "Failed to update Instructions" });
    }
    // console.log(
    //   "New Instructions to be added to MongoDB:",
    //   instructions,
    //   "for",
    //   id
    // );
    response
      .status(202)
      .json({ message: "Got the request to post instructions for:", id });
  } else if (request.method === "GET") {
    try {
      const client = await DBConnection();
      const db = client.db("devdb");
      const collection = db.collection("recipes_edit");
        const recipe = await collection.findOne({ _id: id });
        console.log(recipe.instructions)
        response.status(200).json({ instructions: recipe.instructions });
         client.close();
    } catch (err) {
      console.error("Error Fetching Instructions:", err);
      response.status(505).json({ err: "Failed To Fecth Instructions" });
    }
  } else {
    response.status(607).json({ err: "Method Not Allowed" });
  }
};
export default handler;
