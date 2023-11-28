import { Fragment, useState, useEffect } from "react";
import Loading from "../Loading/Loading";
import { request } from "http";

const EditRecipeInstructions = ({ instructions, onSave }) => {
  const [editedInstructions, setEditedInstructions] = useState([
    ...instructions,
  ]);

  const handleInputChange = (index, newValue) => {
    const updatedInstructions = [...editedInstructions];
    updatedInstructions[index] = newValue;
    setEditedInstructions(updatedInstructions);
  };

  const handleSave = () => {
    onSave(editedInstructions);
    console.log("clicked at save");
  };

  return (
    <Fragment>
      <h3 className='mt-2 text-lg font-semibold'>Edit Instructions</h3>
      <ol className='list-decimal list-inside'>
        {editedInstructions.map((instruction, index) => (
          <li key={index}>
            <input
              type='text'
              value={instruction}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          </li>
        ))}
      </ol>
      <button onClick={handleSave}>Save</button>
    </Fragment>
  );
};

const RecipeInstructions = ({ recipes, recipeId }) => {
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
              <li key={instruction.index} className='text-gray-1000'>
                {instruction.instruction}
              </li>
            )
          );

          setInstructions(reorderedInstructions);
          setLoading(false);
        } else {
          setError("No instructions found.");
          setLoading(false);
        }
      } catch (error) {
        setError("An error occurred while fetching instructions.");
        setLoading(false);
      }
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [recipes]);

  const toggleEditMode = () => {
    setEditMode((prevEditMode) => !prevEditMode);
  };

  const handleInstructionsSave = async (updatedInstructions) => {
    try {
      const requestBody = JSON.stringify({
        recipeId: recipeId,
        instructions: updatedInstructions,
      });
      const response = await fetch(
        "/api/updateInstructions/updateInstructions",
        {
          method: "POST",
          body: requestBody,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ instructions: editedInstructions }),
        }
      );
      if (response.ok) {
        setInstructions(updatedInstructions);
        setEditMode(false);
      } else {
        console.error("Keo, it Failed to update instructions.");
      }
    } catch (error) {
      console.error("Error updating instructions:", error);
    }
    console.log("Save by the bell");
  };

  return (
    <Fragment>
      <h3 className='mt-2 text-lg font-semibold'></h3>
      {loading ? (
        <p>
          <Loading />
        </p>
      ) : error ? (
        <p>{error}</p>
      ) : editMode ? (
        <EditRecipeInstructions
          instructions={recipes.instructions}
          onSave={handleInstructionsSave}
        />
      ) : (
        <Fragment>
          <ol className='list-decimal list-inside'>{instructions}</ol>
          <button onClick={toggleEditMode}>Edit Instructions</button>
        </Fragment>
      )}
    </Fragment>
  );
};

export default RecipeInstructions;
