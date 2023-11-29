import React, { useEffect, useState } from "react";
import Select from "react-select";

import { useTheme } from "../Context/ThemeContext";

/**
 * Functional component representing a tags selection component.
 *
 * @component
 * @param {Object} props - The component's props.
 * @param {Function} props.setSelectedTags - The function to set the selected tags.
 * @param {string[]} props.selectedTags - The currently selected tags.
 * @returns {JSX.Element} - The component's rendered elements.
 */
function Tags({ setSelectedTags, selectedTags }) {
  const [tags, setTags] = useState([]);
  const { theme } = useTheme();

  useEffect(() => {
    async function fetchTags() {
      try {
        const response = await fetch("/api/tags");

        if (response.ok) {
          const data = await response.json();

          if (data) {
            setTags(data.map((tag) => ({ label: tag, value: tag })));
          } else {
            throw Error;
          }
        } else {
          throw Error;
        }
      } catch (error) {
        throw Error;
      }
    }

    fetchTags();
  }, []);

  /**
   * Handles the change in selected tags.
   *
   * @param {Object} selectedOptions - The selected tag options to filter by.
   */
  const handleTagChange = (selectedOptions) => {
    setSelectedTags(selectedOptions.map((option) => option.value));
  };

  const customStyles = {
    multiValue: (base) => ({
      ...base,
      background: "#3496c7",
      color: "white",
    }),

    control: (base) => ({
      ...base,
      backgroundColor: theme === 'light' ? "#007bff" : "#0d203eee",
      color: "black",
      width: "fitContent",
      cursor: "pointer",

      "&:hover": { background: "lightBlue" },
    }),

    multiValueLabel: (base) => ({
      ...base,
      color: "white",
      fontWeight: "bold",
    }),

    placeholder: (base) => ({
      ...base,
      color: "white",
    }),

    menu: (base) => ({
      ...base,
      width: "12em",
    }),
  };

  return (
    <div>
      <Select
        isMulti
        options={tags}
        value={tags.filter((tag) => selectedTags?.includes(tag.value))}
        onChange={handleTagChange}
        styles={customStyles}
        blurInputOnSelect
        placeholder="Select Tag"
      />
    </div>
  );
}

export default Tags;
