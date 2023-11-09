import React, { useState, useEffect } from "react";

function RecipeInstructions({ instruction }) {
  const [isEditingInstructions, setIsEditingInstructions] = useState(false);
  const [editedInstructions, setEditedInstructions] = useState([
    ...instruction,
  ]);

  const handleEditInstructions = () => {
    setIsEditingInstructions(true);
  };

  const handleSave = () => {
    setIsEditingInstructions(false);
    saveInstructions();
  };

  const handleCancel = () => {
    setIsEditingInstructions(false);
    setEditedInstructions([...instruction]);
  };

  const handleInstructionChange = (index, newValue) => {
    const updatedInstructions = [...editedInstructions];
    updatedInstructions[index] = newValue;
    setEditedInstructions(updatedInstructions);
  };

  const saveInstructions = async (updatedInstructions) => {
    try {
      const requestBody = JSON.stringify({
        recipe_Id: recipeId,
        instructions: updatedInstructions,
      });
      const response = await fetch(`/api/Instructions/${recipe._Id}`, {
        method: "POST",
        body: requestBody,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Instructions saved successfully.");
      } else {
        console.error("Failed to save instructions.");
      }
    } catch (error) {
      console.error("An error occurred while saving instructions:", error);
    }
  };

  return (
    <div>
      {isEditingInstructions ? (
        <div>
          <ol className='list-decimal list-inside '>
            {editedInstructions.map((instruction, index) => (
              <li key={index}>
                <input
                  value={instruction}
                  onChange={(e) =>
                    handleInstructionChange(index, e.target.value)
                  }
                  style={{ width: "95%" }}
                />
              </li>
            ))}
          </ol>
          <div>
            <button
              className='bg-red-300 px-2 mx-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className='bg-green-300 px-2 mx-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <ol className='list-decimal list-inside'>
            {editedInstructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
          <button
            className='bg-pink-200 my-2  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={handleEditInstructions}
          >
            Edit Instructions
          </button>
        </div>
      )}
    </div>
  );
}

export default RecipeInstructions;
