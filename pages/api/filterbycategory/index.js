import { filteringByCategory } from "@/helpers/mongoDB-utils";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { selectedCategories,selectedTags, searchQuery } = req.body;

  try {
    const filterResult = await filteringByCategory(selectedCategories,selectedTags, searchQuery);
    res.status(200).json({ recipes: filterResult });
  } catch (error) {
    console.error("Error filtering recipes by category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default handler;
