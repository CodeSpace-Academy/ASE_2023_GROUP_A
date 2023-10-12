// Import MongoDB-related functions
import { fetchCategories } from "../../../helpers/mongoDB-utils";

export default async function handler(req, res) {
  
  if (req.method === 'GET') {
    try {
      const categories = await fetchCategories();
      res.status(200).json(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
