import { filteringByTags } from "@/helpers/mongoDB-utils";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { selectedCategories, selectedTags, searchQuery, enteredNumber } = req.body;

  try {
    const filterTagsResult = await filteringByTags(
      selectedCategories,
      selectedTags,
      searchQuery,
      enteredNumber
    );
    res.status(200).json({ recipes: filterTagsResult });
  } catch (error) {
    console.error("Error filtering recipes by category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default handler;
