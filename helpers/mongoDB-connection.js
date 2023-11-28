import { MongoClient, ServerApiVersion } from "mongodb";

// MongoDB connection URI, including authentication details
const uri = process.env.mongodb_uri;

// Create a MongoDB client instance with specific server API version and options
export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Function to connect to the MongoDB server and return a collection
export const connectToCollection = async (databaseName, collectionName) => {
  try {
    await client.connect();

    const db = client.db(databaseName);
    const collection = db.collection(collectionName);
    return collection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

// Function to close the MongoDB connection
export async function closeMongoDBConnection() {
  await client.close();
}
