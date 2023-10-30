import { useState, useEffect } from "react";

const EditRecipeInstructions = ({ instructions }) => {
  const [newInstructions, setNewInstructions] = useState([...instructions]);
  const [currentInstruction, setCurrentInstruction] = useState("");
  const [showEdit, setShowEdit] = useState(true);

  const updateInstructionsInDB = async (newInstructions) => {
    try {
      const response = await fetch(`/api/recipes/${recipeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ instructions: newInstructions }),
      });
      const data = await response.json();
      console.log("Data updated in the database:", data);
    } catch (error) {
      console.error("Error updating data in the database:", error);
    }
  };

  const saveAddInstruction = () => {
    if (currentInstruction) {
      const updatedInstructions = [...newInstructions, currentInstruction];
      setNewInstructions([updatedInstructions]);
      updateInstructionsInDB(updatedInstructions);
      setCurrentInstruction("");
    }
  };

  const handleRemoveInstruction = (index) => {
    const updatedInstructions = [...newInstructions];
    updatedInstructions.splice(index, 1);
    setNewInstructions(updatedInstructions);
    updateInstructionsInDB(updatedInstructions);
  };

  useEffect(() => {
    // Update the state of the component when the recipeInstructions item is saved to local storage
    const recipeInstructions = localStorage.getItem("recipeInstructions");
    if (recipeInstructions) {
      setNewInstructions(JSON.parse(recipeInstructions));
    }
  }, [instructions]);

  const toggleEdit = () => {
    setShowEdit(!showEdit);
  };

  return (
    <section>
      <div className="flex">
        {/* <strong>Update instructions to your liking</strong> */}
        <button onClick={toggleEdit}> Edit Instructions </button>
      </div>
      {showEdit && (
        <ol>
          <input
            type="text"
            value={currentInstruction}
            onChange={(e) => setCurrentInstruction(e.target.value)}
          />{" "}
          <button
            className="flex bg-blue-500 hover-bg-blue-700 text-white font-bold py-1 px-1 rounded"
            onClick={() => handleRemoveInstruction(index)}
          >
            Remove
          </button>{" "}
          <button
            className="flex bg-blue-500 hover-bg-blue-700 text-white font-bold py-1 px-1 rounded"
            onClick={saveAddInstruction}
          >
            {" "}
            Save new edits
          </button>
        </ol>
      )}
    </section>
  );
};

export default EditRecipeInstructions;
