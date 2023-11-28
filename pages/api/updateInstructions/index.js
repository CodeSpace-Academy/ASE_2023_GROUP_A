import { updateRecipeInstructions } from "../../../helpers/mongoDB-utils";

async function handler(req, res) {
  if (req.method === "PUT") {
    console.log("reaches", req);
    try {
      const { recipeId, instructions } = req.body;

      console.log("POP: ", recipeId, instructions);

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
