/* eslint-disable react/prop-types */
/* eslint-disable no-trailing-spaces */
import React, { useState, useRef } from "react";

function DescriptionEdit({
  initialDescription,
  onSave,
  toggleEditing,
}) {
  const [newDescription, setNewDescription] = useState(initialDescription);
  const newTextRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const handleDescriptionChange = (e) => {
    setNewDescription(e.target.value);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onSave(newDescription);
      toggleEditing();
    } catch (error) {
      console.error("Error updating description:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <textarea
        ref={newTextRef}
        className="w-auto h-auto bg-gray-300"
        value={newDescription}
        onChange={handleDescriptionChange}
        rows={5}
        cols={50}
        disabled={isLoading}
      />
      <button
        type="button"
        className="bg-orange-300 rounded-sm-3"
        onClick={handleSave}
        disabled={isLoading}
      >
        <p className="text-black">{isLoading ? "Saving..." : "Save"}</p>
      </button>
     
    </div>
  );
}

export default DescriptionEdit;
