import { filteringByInstructions } from "@/helpers/mongoDB-utils";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { selectedInstructions } = req.body;

  try {
    const filterInstructionsResults = await filteringByInstructions(
      Number(selectedInstructions)
    );
    res.status(200).json({ recipes: filterInstructionsResults });
  } catch (error) {
    console.error("Error filtering recipes by Instructions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default handler;
