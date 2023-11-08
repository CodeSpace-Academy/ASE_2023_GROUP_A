import { useState, useEffect } from "react";

const UpdateRecipeInstructions = ({ instructions, recipes }) => {
  const [newInstructions, setNewInstructions] = useState([]);
  const [currentInstruction, setCurrentInstruction] = useState([]);

  const handleAddInstruction = () => {
    if (currentInstruction) {
      setNewInstructions([...newInstructions, currentInstruction]);
      setCurrentInstruction("");
      console.log("Clicked Added Instruction");
    }
  };

  const handleRemoveInstruction = (index) => {
    const updatedInstructions = [...newInstructions];
    updatedInstructions.splice(index, 1);
    setNewInstructions(updatedInstructions);
    console.log("Clicked Removed");
  };

  const handleSaveChanges = () => {
    // Save the updated instructions to local storage
    // localStorage.setItem("recipeInstructions", JSON.stringify(newInstructions));
    // Call the onSave callback function with the updated instructions
    onSave(newInstructions);
    console.log("Clicked Saved");
  };

  useEffect(() => {
    const recipeInstructions = localStorage.getItem("recipeInstructions");
    if (recipeInstructions) {
      setNewInstructions(JSON.parse(recipeInstructions));
    }
  }, []);

  return (
    <section>
      <div className='flex'>
        <strong>Update instructions to your liking</strong>
      </div>
      <ol>
        {newInstructions.map((instruction, index) => (
          <li key={index}>
            <input
              type='text'
              value={instruction}
              onChange={(e) => {
                const updatedInstructions = [...newInstructions];
                updatedInstructions[index] = e.target.value;
                setNewInstructions(updatedInstructions);
              }}
              className='w-200 border border-gray-300 rounded-md mr-2 p-1'
            />
            <button onClick={() => handleRemoveInstruction(index)}>
              Remove
            </button>
          </li>
        ))}
      </ol>
      <input
        type='text'
        value={currentInstruction}
        onChange={(e) => setCurrentInstruction(e.target.value)}
      />{" "}
      {instructions}
      <button
        className='flex bg-blue-500 hover-bg-blue-700 text-white font-bold py-1 px-1 rounded'
        onClick={handleAddInstruction}
      >
        Add New Instruction
      </button>
      <button
        className='flex bg-blue-500 hover-bg-blue-700 text-white font-bold py-1 px-1 rounded'
        onClick={handleSaveChanges}
      >
        Save new edits
      </button>
    </section>
  );
};

export default UpdateRecipeInstructions;
