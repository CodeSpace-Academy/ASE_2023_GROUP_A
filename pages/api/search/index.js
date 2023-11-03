import { searching } from "@/helpers/mongoDB-utils";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { searchQuery, selectedCategories, selectedTags } = req.body;

  try {
    const searchResult = await searching(searchQuery, selectedCategories, selectedTags);
    res.status(200).json({ recipes: searchResult });
  } catch (error) {
    console.error("Error searching recipes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default handler;
