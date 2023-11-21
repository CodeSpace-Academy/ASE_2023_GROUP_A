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

  const handleDescriptionChange = (e) => {
    setNewDescription(e.target.value);
  };

  const handleSave = () => {
    onSave(newDescription);
    toggleEditing();
  };
  return (
    <div>
      <textarea
        ref={newTextRef}
        className='w-auto h-auto bg-gray-300'
        value={newDescription}
        onChange={handleDescriptionChange}
        rows={5}
        cols={50}
      />
      <button type="button" className="bg-orange-300 rounded-sm-3" onClick={handleSave}>
        <p className="text-black">Save</p>
      </button>
    </div>
  );
}

export default DescriptionEdit;
