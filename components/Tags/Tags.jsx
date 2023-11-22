import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Select from "react-select";

function Tags({ setSelectedTags, selectedTags }) {
  const [tags, setTags] = useState([]);

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

  const handleTagChange = (selectedOptions) => {
    setSelectedTags(selectedOptions.map((option) => option.value));
  };

  const customStyles = {
    multiValue: (base) => ({
      ...base,
      background: "red",
      color: "white",
    }),

    control: (base) => ({
      ...base,
      backgroundColor: "#007bff",
      color: "white",
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
        placeholder="Select tag"
      />
    </div>
  );
}

Tags.propTypes = {
  setSelectedTags: PropTypes.func.isRequired,
  selectedTags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Tags;
