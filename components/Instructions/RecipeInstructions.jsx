import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Loading from "../Loading/Loading";

function EditRecipeInstructions({ instructions, recipeId, onCancel }) {
  const [editedInstructions, setEditedInstructions] = useState([
    ...instructions,
  ]);
  const router = useRouter();

  const handleInputChange = (index, newValue) => {
    const updatedInstructions = [...editedInstructions];
    updatedInstructions[index] = newValue;
    setEditedInstructions(updatedInstructions);
  };

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
        router.replace(router.asPath);
      } else {
        console.error("Failed to update instructions.");
      }
    } catch (error) {
      console.error("Error updating instructions:", error);
    }
  };
  const handleCancel = () => {
    onCancel();
  };
  return (
    <>
      <h3 className="mt-2 text-lg font-semibold">Edit Instructions</h3>
      <ol className="list-decimal list-inside bg-pink-200">
        {editedInstructions.map((instruction, index) => (
          <li key={editedInstructions.recipeId}>
            <input
              className="bg-orange-200 w-full"
              type="text"
              value={instruction}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          </li>
        ))}
      </ol>
      <div className="flex flex-row gap-4">
        {" "}
        <div>
          <button type="button" onClick={handleInstructionsSave}>
            Save
          </button>
        </div>
        <div>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

function RecipeInstructions({ recipes, recipeId }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [instructions, setInstructions] = useState([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const delay = 2000;
    const timeoutId = setTimeout(() => {
      try {
        if (recipes && recipes.instructions) {
          const sortedInstructions = recipes.instructions.map(
            (instruction, index) => ({ index, instruction })
          );
          sortedInstructions.sort((a, b) => a.index - b.index);

          const reorderedInstructions = sortedInstructions.map(
            (instruction) => (
              <li key={instruction.index} className="text-gray-1000">
                {instruction.instruction}
              </li>
            ),
          );

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

  const toggleEditMode = () => {
    setEditMode((prevEditMode) => !prevEditMode);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };


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
        onCancel={handleCancelEdit} />
    );
  } else {
    content = (
      <>
        <ol className="list-decimal list-inside">{instructions}</ol>
        <button onClick={toggleEditMode} type="button">Edit Instructions</button>
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
