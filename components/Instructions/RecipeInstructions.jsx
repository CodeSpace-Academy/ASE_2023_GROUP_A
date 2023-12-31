/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from "react";
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
          (instruction, index) => ({ index, instruction }),
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
      } catch (err) {
        // Handle any errors that occur during the process
        setError("An error occurred while fetching instructions.");
        setLoading(false);
      }
    }, delay);

    // Cleanup the timeout to prevent memory leaks
    return () => clearTimeout(timeoutId);
  }, [recipes.instructions]);

  return (
    <>
      <h3 className="mt-2 text-lg font-semibold">Error</h3>
      {loading ? (
        // Display a loading message while instructions are being processed
        <p><Loading /></p>
      ) : error ? (
        // Display an error message if an error occurs
        <p>{error}</p>
      ) : (
        // Display the ordered list of instructions
        <ol className="list-decimal list-inside">{instructions}</ol>
      )}
    </>
  );
};

export default RecipeInstructions;
