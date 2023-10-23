import { useState, useRef } from "react";

const DescriptionEdit = ({ initialDescription, onSave }) => {
  // const [description, setDescription] = useState(initialDescription);
  const [newDescription, setNewDescription] = useState(initialDescription);
  const newTextRef = useRef();

  const handleDescriptionChange = (e) => {
    setNewDescription(e.target.value);
  };

  const handleSave = () => {
    onSave(newDescription);
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
      />
      <button className="bg-orange-300 rounded-sm-3" onClick={handleSave}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </button>
    </div>
  );
};

export default DescriptionEdit;
