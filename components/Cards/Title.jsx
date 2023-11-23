import React from "react";
import Highlighter from "react-highlight-words";
import styles from "./Title.module.css";

/**
 * Title component displays a title with optional highlighting.
 *
 * @component
 * @param {object} props - The properties of the component.
 * @param {string} props.title - The title text to display.
 * @param {string|array} [props.searchQuery] -
 * The search query for highlighting. If provided, the title will be highlighted.
 * @returns {JSX.Element} - The rendered Title component.
 */
function Title({ title, searchQuery }) {
  // Check if title is defined; if not, set it to an empty string
  const sanitizedTitle = title || '';

  // Calculate the word count in the title
  const wordCount = sanitizedTitle.split(/\s+/).length;

  /**
   * Calculate font size based on the number of words in the title.
   *
   * @function
   * @private
   * @returns {string|undefined} -
   * The CSS class for the font size or undefined if the condition is not met.
   */
  const calculateFontSize = () => {
    if (wordCount > 3) {
      return styles.textSmall;
    }
    return undefined;
  };

  const titleClass = calculateFontSize();

  return (
    <h2 className={`${titleClass} font-semibold mb-2 font-alkatra h-[40px]`}>
      {searchQuery ? (
        <Highlighter
          highlightClassName="YourHighlightClass"
          searchWords={searchQuery}
          textToHighlight={sanitizedTitle}
          autoEscape
        />
      ) : (
        sanitizedTitle
      )}
    </h2>
  );
}

export default Title;
