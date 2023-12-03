import { getTags } from "../../../helpers/mongoDB-utils";

export default async (req, res) => {
  if (req.method === "GET") {
    const tags = await getTags();

    res.status(200).json(tags);
  } else {
    res.status(405).end();
  }
};
