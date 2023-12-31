import React, { useState } from "react";

// DropdownMenu component allows users to select an option from a dropdown list
const DropdownMenu = ({ options, onSelect }) => {
  // State to manage the dropdown's open/closed state and the selected option
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  // Function to toggle the dropdown's open/closed state
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle the selection of an option
  const handleOptionSelect = (option) => {
    // Set the selected option, trigger the provided onSelect callback, and close the dropdown
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={toggleDropdown}
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
        >
          {selectedOption || "Select a category"}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 14l-5.293-5.293a1 1 0 011.414-1.414L10 11.586l4.293-4.293a1 1 0 111.414 1.414L11.414 14l4.293 4.293a1 1 0 11-1.414 1.414L10 16.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 14 4.293 9.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 max-h-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none overflow-y-auto">
          <div
            className="py-1 max-h-40 overflow-y-auto"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option) => (
              // Render each option as a button and handle its selection
              <button
                type="button"
                key={option}
                onClick={() => handleOptionSelect(option)}
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
