import { filteringByIngredient } from "@/helpers/mongoDB-utils";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { selectedIngredients } = req.body;

  try {
    const filterIngredientsResult = await filteringByIngredient(
      selectedIngredients
    );
    res.status(200).json({ recipes: filterIngredientsResult });
  } catch (error) {
    console.error("Error filtering recipes by category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default handler;
