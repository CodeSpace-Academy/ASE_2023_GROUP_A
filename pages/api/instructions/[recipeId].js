/**
 * This is a JavaScript function that handles requests to update or retrieve instructions for a recipe
 * in a MongoDB database.
 * @param request - The `request` parameter is an object that contains information about the incoming
 * HTTP request. It includes properties such as `query` (containing query parameters), `body`
 * (containing the request body), and `method` (containing the HTTP method used in the request).
 * @param response - The `response` parameter is the HTTP response object that is used to send the
 * response back to the client. It is used to set the status code, headers, and send the response body.
 */
import { DBConnection } from "../../../helpers/mongoDB-utils";

const handler = async (request, response) => {
  const id = request.query.recipeId;
  const { instructions } = request.body;
  if (request.method === "PUT") {
    try {
      const client = await DBConnection();
      const db = client.db("devdb");
      const collection = db.collection("recipes");
      const results = await collection.findOneAndUpdate(
        { _id: id },
        { $set: { instructions: instructions } }
        );
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
    response
      .status(202)
      .json({ message: "Got the request to post instructions for:", id });
  } else if (request.method === "GET") {
    try {
      const client = await DBConnection();
      const db = client.db("devdb");
      const collection = db.collection("recipes");
        const recipe = await collection.findOne({ _id: id });
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
