import { useEffect, useState } from "react";
import Select from "react-select";

function Tags({
  setFilterTagsResults,
  handleDefaultTagFilter,
  setRecipes,
  setSelectedTags,
  selectedTags,
}) {
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
            console.error("Response data is missing tags.");
          }
        } else {
          console.error("Failed to fetch tags");
        }
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    }

    fetchTags();
  }, []);

  useEffect(() => {
    const fetchRecipesByTags = async () => {
      if (selectedTags.length === 0) {
        setFilterTagsResults([]);
      } else {
        try {
          const response = await fetch(`/api/filterbytags`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ selectedTags }),
          });

          if (response.ok) {
            const filterTagsResult = await response.json();
            setFilterTagsResults(filterTagsResult.recipes);
          } else {
            console.error("Failed to fetch tags by category");
          }
        } catch (error) {
          console.error("Error fetching recipes by tags:", error);
        }
      }
    };

    if (selectedTags.length > 0) {
      fetchRecipesByTags(selectedTags);
    } else {
      handleDefaultTagFilter();
    }
  }, [selectedTags, setRecipes]);

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
      backgroundColor: "#6ca9f0",
      color: "white",
      width: "fitContent",
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
        value={tags.filter((tag) => selectedTags.includes(tag.value))}
        onChange={handleTagChange}
        styles={customStyles}
        blurInputOnSelect
        placeholder="Select Tag"
      />
    </div>
  );
}

export default Tags;
