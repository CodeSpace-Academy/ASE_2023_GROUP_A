import React, { useState, useEffect } from "react";
import Loading from "../Loading/Loading";
import RecipeInstructions from "./RecipeInstructions";
import { updateInstructionsInDB } from "../../pages/api/instructions/[recipeId]";

const UpdateRecipeInstructions = ({ recipeId }) => {
  const [instructions, setInstructions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the initial instructions when the component mounts
    const fetchInstructions = async () => {
      try {
        // Call your API to get the current instructions for the recipeId
        const response = await fetch(`/api/recipes/${recipeId}/instructions`);
        const data = await response.json();

        if (response.ok) {
          setInstructions(data.instructions);
        } else {
          setError("Error fetching instructions");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching instructions", error);
        setError("Error fetching instructions");
        setLoading(false);
      }
    };

    fetchInstructions();
  }, [recipeId]);

  const handleUpdateInstructions = async (updatedInstructions) => {
    try {
      // Call your API to update the instructions
      const response = await updateInstructionsInDB(recipeId, updatedInstructions);

      if (response.ok) {
        // If the update is successful, update the state
        setInstructions(updatedInstructions);
      } else {
        setError("Error updating instructions");
      }
    } catch (error) {
      console.error("Error updating instructions", error);
      setError("Error updating instructions");
    }
  };

  return (
    <section>
      <h2>UpdateRecipeInstructions</h2>
      {loading ? (
        <Loading />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <RecipeInstructions recipes={{ instructions }} onUpdateInstructions={handleUpdateInstructions} />
      )}
    </section>
  );
};

export default UpdateRecipeInstructions;
