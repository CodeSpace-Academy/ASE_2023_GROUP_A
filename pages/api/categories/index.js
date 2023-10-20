// Import MongoDB-related functions to fetch categories
import { fetchCategories } from "../../../helpers/mongoDB-utils";

// Define an asynchronous API route handler
export default async function handler(req, res) {
  // Check if the request method is GET
  if (req.method === 'GET') {
    try {
      // Fetch categories from the MongoDB database
      const categories = await fetchCategories();

      // Respond with a 200 OK status and the retrieved categories
      res.status(200).json(categories);
    } catch (error) {
      // Handle and log errors that occur during category fetching
      console.error('Error fetching categories:', error);
      // Respond with a 500 Internal Server Error status and an error message
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // Respond with a 405 Method Not Allowed status for non-GET requests
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
