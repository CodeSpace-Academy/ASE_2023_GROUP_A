// import { ObjectId } from "mongodb";
import { DBConnection } from "@/helpers/mongoDB-utils";
const handler = async (req, res) => {
  if (req.method === "PUT") {
    console.log(req);
    const { description } = req.body;
    const  id  = req.query.id; // Access the _id from the URL parameter

    try {
      const client = await DBConnection();
      const db = client.db("devdb");
      const collection = db.collection("recipes_edit");
      
      // Convert the id to an ObjectID (assuming it's a MongoDB _id)
      // const objectId = new ObjectId(id);

      const result = await collection.updateOne(
        { _id: id }, // Use ObjectID to match the _id
        {
          $set: { description: description }, // Use $set to update the description
        }
      );
console.log("Response for Updating Description:", result)
      if (result.modifiedCount === 1) {
        res.status(200).json({ message: "Description updated successfully" });
      } else {
        res.status(404).json({ error: "Recipe not found" });
      }
    } catch (error) {
      console.error("Error updating description:", error);
      res.status(500).json({ error: "Failed to update description" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default handler;
