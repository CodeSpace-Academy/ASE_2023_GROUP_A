import { getCategories } from "@/helpers/mongoDB-utils";

export default async (req, res) => {
  if (req.method === "GET") {
    const categories = await getCategories();

    res.status(200).json(categories);
  } else {
    res.status(405).end();
  }
};
