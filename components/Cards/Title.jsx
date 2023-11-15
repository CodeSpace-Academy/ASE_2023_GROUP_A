/* eslint-disable react/prop-types */
import React from "react";
import Highlighter from "react-highlight-words";

function Title({ title, searchQuery }) {
 const titleClass =
   title.length > 10
      ? "text-sm sm:text- md:text-sm lg:text-md" // Use smaller font for longer titles
      : "text-md sm:text-lg md:text-xl lg:text-2xl"; // Use larger font for shorter titles

  return (
    <h2 className={`${titleClass} font-semibold mb-2 font-alkatra`}>
      {searchQuery ? (
        <Highlighter
          highlightClassName="YourHighlightClass"
          searchWords={searchQuery}
          textToHighlight={title}
          autoEscape
        />
      ) : ({ title })}
    </h2>
  );
}

export default Title;
