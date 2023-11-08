import { getIngredients } from "@/helpers/mongoDB-utils";

export default async (req, res) => {
  if (req.method === "GET") {
    const ingredients = await getIngredients();

    res.status(200).json(ingredients);
  } else {
    res.status(405).end();
  }
};
