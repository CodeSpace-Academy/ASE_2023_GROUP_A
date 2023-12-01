import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import classes from "./searchBar.module.css";

/**
 * Functional component representing a search bar for recipes.
 *
 * @component
 * @param {Object} props - The component's props.
 * @param {Function} props.onSearch - The function to handle search.
 * @param {string} props.searchQuery - The current search query.
 * @param {Function} props.setSearchQuery - The function to set the search query.
 * @returns {JSX.Element} - The component's rendered elements.
 */
export default function SearchBar({ onSearch, searchQuery, setSearchQuery }) {
  const [isLongQuery, setIsLongQuery] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(0);
  const [showSearchButton, setShowSearchButton] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const history = localStorage.getItem("searchHistory");

    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  /**
   * Handles the search operation when the search button is clicked.
   */
  const handleSearch = () => {
    if (isLongQuery) {
      onSearch(searchQuery);

      setSearchHistory((prevHistory) => {
        const updatedHistory = [searchQuery, ...prevHistory].slice(0, 5);
        localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
        return updatedHistory;
      });
    }
  };

  /**
   * Handles changes in the search input.
   *
   * @param {Object} e - The input event object.
   */
  const handleChange = (e) => {
    const text = e.target.value;
    setSearchQuery(text);
    setIsLongQuery(text.length >= 4);

    if (isLongQuery) {
      setShowSearchButton(true);
    }

    if (text.length <= 4) {
      clearTimeout(typingTimeout);
      setShowSearchButton(false);

      const newTimeout = setTimeout(() => {
        onSearch(searchQuery);
      }, 500);

      setTypingTimeout(newTimeout);
    } else {
      clearTimeout(typingTimeout);
    }
  };

  /**
   * Handles a click on a history item, updating the search query.
   *
   * @param {string} historyItem - The selected history item.
   */
  const handleHistoryClick = (historyItem) => {
    setSearchQuery(historyItem);
    setShowSearchButton(false);
  };

  /**
   * Clears the current search query.
   */
  const clearSearch = () => {
    setSearchQuery("");
    setShowSearchButton(false);
  };

  return (
    <div>
      <div className={classes.searchContainer}>
        <div>
          <input
            type="text"
            placeholder="Search for recipes..."
            value={searchQuery || ""}
            onClick={() => setShowSearchButton(true)}
            onChange={handleChange}
            className={classes.searchInput}
          />

          {searchQuery && (
            <button type="button" className={classes.clearButton} onClick={clearSearch}>
              ❌
            </button>
          )}
        </div>

        {showSearchButton && isLongQuery && (
          <button type="button" onClick={handleSearch}>Search</button>
        )}
      </div>
      {searchHistory.length > 0 && showSearchButton && !isLongQuery && (
        searchHistory.map((historyItem) => (
          <div className="history" key={uuidv4()}>
            <button type="button" onClick={() => handleHistoryClick(historyItem)}>
              {historyItem}
            </button>
          </div>
        ))
      )}
    </div>
  );
}
