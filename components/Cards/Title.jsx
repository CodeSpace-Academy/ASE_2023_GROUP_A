/* eslint-disable react/prop-types */
import React from "react";
import Highlighter from "react-highlight-words";
import styles from "./Title.module.css"
function Title({ title, searchQuery }) {
  const wordCount = title.split(/\s+/).length;

  // Calculate font size based on the number of words in the title
  const calculateFontSize = (wordCount) => {
    if (wordCount > 3) {
      return styles.textSmall; // Use smaller font for longer titles
    }
  };

  const titleClass = calculateFontSize(wordCount);

  return (
    <h2 className={`${titleClass} font-semibold mb-2 font-alkatra`}>
      {searchQuery ? (
        <Highlighter
          highlightClassName="YourHighlightClass"
          searchWords={searchQuery}
          textToHighlight={title}
          autoEscape
        />
      ) : (
        title
      )}
    </h2>
  );
}

export default Title;
