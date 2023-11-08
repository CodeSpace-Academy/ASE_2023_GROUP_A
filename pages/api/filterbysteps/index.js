import { filteringBySteps } from "@/helpers/mongoDB-utils";

const handler = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({error: "Method not allowed"})
    }

    const {selectedCategories, sectectedTags, searchQuery, enteredNumber} = req.body;

    try {
        const filterStepsResults = await filteringBySteps(
            selectedCategories,
            sectectedTags,
            searchQuery,
            enteredNumber
        );
        res.status(200).json({ recipes: filterStepsResults})
    } catch (error) {
        console.log("Error filtering recipes by steps:", error);
        res.status(500).json({ error: "Internal server error"})
    }
};

export default handler;