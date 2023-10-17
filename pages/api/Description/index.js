import {
    updateDescription
} from "../../../helpers/mongoDB-utils";


const handler = async (req, res) => {
    if (req.method === "PUT") {
        const { id, description } = req.body;
        try {
            await updateDescription(id, description);
            res.status(200).json({ message: "Description updated successfully" });
        } catch (error) {
            console.error("Error updating description:", error);
            res.status(500).json({ error: "Failed to update description" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    };
    
};

export default handler;