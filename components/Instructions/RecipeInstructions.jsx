import { Fragment, useState, useEffect } from "react";
import Loading from "../Loading/Loading";

// RecipeInstructions component displays a list of instructions for a recipe
const RecipeInstructions = ({ recipes }) => {
  // State to handle loading and error states
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // State to store the sorted and reordered instructions
  const [instructions, setInstructions] = useState([]);

  useEffect(() => {
    // Delay for simulating a loading state (e.g., 2 seconds)
    const delay = 2000;

    // Set a timeout to fetch and process instructions
    const timeoutId = setTimeout(() => {
      try {
        // Sort the instructions based on their index
        const sortedInstructions = recipes.instructions.map(
          (instruction, index) => ({ index, instruction })
        );
        sortedInstructions.sort((a, b) => a.index - b.index);

        // Map the sorted instructions to list items
        const reorderedInstructions = sortedInstructions.map((instruction) => (
          <li key={instruction.index} className="text-gray-1000">
            {instruction.instruction}
          </li>
        ));

        // Set the reordered instructions and mark loading as complete
        setInstructions(reorderedInstructions);
        setLoading(false);
      } catch (error) {
        // Handle any errors that occur during the process
        setError("An error occurred while fetching instructions.");
        setLoading(false);
      }
    }, delay);

    // Cleanup the timeout to prevent memory leaks
    return () => clearTimeout(timeoutId);
  }, [recipes.instructions]);

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
              className='bg-red-400 px-2 mx-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              onClick={saveInstructions}
              instruction={editedInstructions}
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
