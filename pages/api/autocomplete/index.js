import { searchSuggestions } from "@/helpers/mongoDB-utils";

export default async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { searchQuery } = req.query;

  try {
    const autocompleteResults = await searchSuggestions(searchQuery);
    res
      .status(200)
      .json({
        autocomplete: autocompleteResults.map((result) => result.title),
      });
  } catch (error) {
    console.error("Error fetching autocomplete suggestions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
