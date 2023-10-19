const handler = async (request, response) => {
    const id = request.query.recipeId;
  if (request.method === "PUT") {
    response
      .status(202)
      .json({ message: "Got the request to post instructions for:", id });
  } else if (request.method === "GET") {
    response.status(201).json({ message: "Got the request to return to return instructions for:", id });
  } else {
  }
};
export default handler;
