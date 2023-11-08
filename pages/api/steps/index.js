import { getNumberOfSteps } from "@/helpers/mongoDB-utils";

export default async (req, res) => {
  if (req.method === "GET") {
    const instructions = await getNumberOfSteps();

    res.status(200).json(instructions);
  } else {
    res.status(405).end();
  }
};


