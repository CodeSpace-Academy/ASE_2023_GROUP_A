import { updateRecipeInstructions } from "@/helpers/mongoDB-connection";

async function handler(request, response) {
  if (request.method === "POST") {
    try {
      const { recipeId, instructions } = req.body;

      if (!instructions) {
        return response.status(400).json({ message: "Invalid input" });
      }

      const result = await updateRecipeInstructions(recipeId, instructions);

      if (result.success) {
        return response.status(200).json({
          success: true,
          message: "Instructions updated successfully",
        });
      } else {
        return response.status(500).json({ message: "Internal server error" });
      }
    } catch (error) {
      return {
        success: false,
        message: `Error updating instructions: ${error.message}`,
      };
    }
  }
}
