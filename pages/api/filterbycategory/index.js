import { filtering } from "@/helpers/mongoDB-utils";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { selectedCategories, searchQuery } = req.body;

  try {
    const filterResult = await filtering(selectedCategories, searchQuery);
    res.status(200).json({ recipes: filterResult });
  } catch (error) {
    console.error("Error filtering recipes by category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default handler;