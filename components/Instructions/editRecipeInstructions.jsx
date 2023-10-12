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
      <div className="flex ">
        Edit recipe{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      </div>
      {/* <input /> */}
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
        className=" flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSaveChanges}
      >
        Save new edits
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </section>
  );
}

export default EditRecipeInstructions;
