import React, { useState, useEffect } from "react";
import EditRecipeInstructions from "./EditRecipeInstructions";
import Loading from "../Loading/Loading";

/**
 * This component renders and manages the instructions of a recipe.
 *  It fetches the instructions from the API, displays them in a list,
 *  and allows the user to edit them.
 *
 * @param {Object} recipes - The recipes object from the parent component.
 * @param {number} recipeId - The ID of the recipe.
 * @returns {ReactElement} The recipe instructions component.
 */
function RecipeInstructions({ recipes, recipeId }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [instructions, setInstructions] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const [editedInstructions] = useState(instructions);

  /**
   * Handles the saving of edited instructions.
   */
  const handleInstructionsSave = async () => {
    const requestBody = JSON.stringify({
      recipeId,
      instructions: editedInstructions,
    });

    try {
      const response = await fetch("/api/updateInstructions", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      });

      if (response.ok) {
        setInstructions(editedInstructions);
      } else {
        throw new Error("Failed to update instructions.");
      }
    } catch {
      throw new Error("Error updating instructions:", error);
    } finally {
      setEditMode(false);
    }
  };

  /**
   * Fetches the instructions from the API and sets the state.
   */
  useEffect(() => {
    const delay = 2000;

    const timeoutId = setTimeout(() => {
      try {
        if (recipes && recipes.instructions) {
          const sortedInstructions = recipes.instructions.map(
            (instruction, index) => ({ index, instruction }),
          );
          sortedInstructions.sort((a, b) => a.index - b.index);

          const reorderedInstructions = sortedInstructions.map((instruction) => (
            <li key={instruction.index} className="text-black-200  mb-3">
              {instruction.instruction}
            </li>
          ));

          setInstructions(reorderedInstructions);
          setLoading(false);
        } else {
          setError("No instructions found.");
          setLoading(false);
        }
      } catch {
        setError("An error occurred while fetching instructions.");
        setLoading(false);
      }
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [recipes]);

  /**
   * Toggles the edit mode.
   */
  const toggleEditMode = () => {
    setEditMode((prevEditMode) => !prevEditMode);
  };

  /**
   * Cancels the editing of instructions.
   */
  const handleCancelEdit = () => {
    setEditMode(false);
  };

  // Determine the content to render based on the loading, error, and edit mode states
  let content;
  if (loading) {
    content = <Loading />;
  } else if (error) {
    content = <p>{error}</p>;
  } else if (editMode) {
    content = (
      <EditRecipeInstructions
        instructions={recipes.instructions}
        recipeId={recipeId}
        onCancel={handleCancelEdit}
        onSave={handleInstructionsSave}
      />
    );
  } else {
    content = (
      <>
        <ol className="list-decimal list-inside">{instructions}</ol>
        <button onClick={toggleEditMode} type="button" className="ml-10 flex border border-black text-black hover:text-blue-400 px-2 py-2 rounded-lg">
          Edit Instructions
        </button>
      </>
    );
  }

  return (
    <>
      <h3 className="text-lg font-semibold"> Instruction </h3>
      {content}
    </>
  );
}

export default RecipeInstructions;