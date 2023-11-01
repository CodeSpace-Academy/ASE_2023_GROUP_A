import { MongoClient, ServerApiVersion } from "mongodb";

// MongoDB connection URI, including authentication details
const uri = `mongodb+srv://groupa:${process.env.mongodb_password}@${process.env.mongodb_username}.uyuxme9.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoDB client instance with specific server API version and options
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
export const DBConnection = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};
// Function to connect to the MongoDB server and return a collection
export const connectToCollection=async(databaseName, collectionName) =>{
  try {
      const client = await DBConnection();
    const db = client.db(databaseName);
      const collection = db.collection(collectionName);
    return collection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

// Function to close the MongoDB connection
export async function closeMongoDBConnection() {
  await client.close();
  console.log("MongoDB connection closed");
}
