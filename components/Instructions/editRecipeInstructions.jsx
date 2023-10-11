import { useEffect, useState } from "react";

function EditRecipeInstructions({ recipes }) {
  const [instructions, setInstructions] = useState([]);

  useEffect(() => {
    if (recipes) {
      const fetchRecipeInstructions = async () => {
        const response = await fetch(`/api/recipes/${recipe.id}/instructions`);
        const instructions = await response.json();

        setInstructions(instructions);
      };
      fetchRecipeInstructions();
    }
  }, [recipes]);

  const handleInstructionChange = (index, newInstruction) => {
    setInstructions((prevInstructions) => {
      const updatedInstructions = [...prevInstructions];
      updatedInstructions[index] = newInstruction;
      return updatedInstructions;
    });
  };

  const handleSaveChanges = async () => {
    const response = await fetch(`/api/recipes/${recipes._id}/instructions`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(instructions),
    });

    if (response.ok) {
      <p>Recipe instructions updated</p>;
    } else {
      <p>Whoopsie, failed to load recipe instructions, please try again</p>;
    }
  };
  return (
    <section>
      <div class="flex ">Edit recipe </div>
      <input />
      <h1>hi </h1>
      <ol>
        {instructions.map((instruction, index) => (
          <li key={index}>
            <input
              type="text"
              value={instruction}
              onChange={(e) => handleInstructionChange(index, e.target.value)}
            />
          </li>
        ))}
      </ol>
      <button
        class=" flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSaveChanges}
      >
        Save new edits
      </button>
    </section>
  );
}

export default EditRecipeInstructions;
