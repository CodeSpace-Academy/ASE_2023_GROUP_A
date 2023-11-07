import { useEffect, useState } from "react";

export default function InstructionF(ff, setFilterInstructionsResults) {
  const [selectedInstructions, setI] = useState("");

  const fetchRecipesByInstructions = async (selectedInstructions) => {
    if (selectedInstructions < 0 || selectedInstructions == "") {
      setFilterCategoryResults([]);
    } else {
      try {
        const response = await fetch(`/api/filterbyinstructions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            selectedInstructions: parseInt(selectedInstructions),
          }),
        });

        if (response.ok) {
          const filterInstructionsResult = await response.json();
          // setRecipes(filterResult.recipes);
          setFilterInstructionsResults(filterInstructionsResult.recipes);
          // setCount(filterResult.recipes.length);
        } else {
          console.error("Failed to fetch recipes by instruction");
        }
      } catch (error) {
        console.error("Error fetching recipes by instruction:", error);
      }
    }
  };

  function handleFilterInstructions(selectedInstructions) {
    if (parseInt(selectedInstructions) >= 0) {
      fetchRecipesByInstructions(selectedInstructions);
    } else {
      setFilterInstructionsResults([]);
    }
  }

  function handleChange(e) {
    setI(e.target.value);
  }

  return (
    <div className="flex">
      <input
        type="number"
        placeholder="Enter number of instructions..."
        value={selectedInstructions}
        onChange={handleChange}
        className="border border-gray-300 rounded-l-md px-4 py-2"
      />
      <button
        onClick={handleFilterInstructions}
        className="bg-blue-500 text-white rounded-r-md px-4 py-2"
      >
        Filter
      </button>
    </div>
  );
}
