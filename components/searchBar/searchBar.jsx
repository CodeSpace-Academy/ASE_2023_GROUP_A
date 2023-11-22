import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classes from "./searchBar.module.css";

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

  const handleHistoryClick = (historyItem) => {
    setSearchQuery(historyItem);

    setShowSearchButton(false);
  };

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
        <ul className="autocomplete-list">
          {searchHistory.map((historyItem, index) => (
            <li key={index} onClick={() => handleHistoryClick(historyItem)}>
              {historyItem}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.arrayOf(PropTypes.string).isRequired,
};
