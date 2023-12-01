/**
 * Function that handles a PUT request to update recipe instructions in a MongoDB
 * database.
 * @param req - The `req` parameter is the request object that contains information
 * about the incoming
 * HTTP request, such as the request method, headers, and body. It is used to retrieve data from the
 * client and pass it to the server.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It is an instance of the `http.ServerResponse` class in Node.js.
 * @returns The handler function returns a response object with a status code and a JSON message.
 *  The specific response depends on the conditions within the function.
 * If the request method is "PUT" and * the instructions are valid,
 * it returns a 200 status code with a success message. If there is an
 * error or the conditions are not met,
 *  it returns a 400 or 500 status code with an appropriate error message
 */

import { updateRecipeInstructions } from "../../../helpers/mongoDB-utils";

async function handler(req, res) {
  if (req.method === "PUT") {
    console.log('reaches', req);
    try {
      const { recipeId, instructions } = req.body;
      if (!instructions) {
        return res.status(400).json({ message: "Invalid instructions format" });
      }

      const result = await updateRecipeInstructions(recipeId, instructions);
      console.log(result);

      if (result.success) {
        return res.status(200).json({ message: result.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    } catch (error) {
      console.error("Request handling error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}

export default handler;
