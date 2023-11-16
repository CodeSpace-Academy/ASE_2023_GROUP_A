import { filtering } from "../../../helpers/mongoDB-utils";

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { filters, sortOrder } = req.body;

  try {
    const result = await filtering(filters, sortOrder);

    res.status(200).json({ recipes: result });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
