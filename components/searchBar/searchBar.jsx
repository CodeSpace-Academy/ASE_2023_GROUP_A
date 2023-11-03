import React, { useState, useEffect } from "react";
import classes from './searchBar.module.css';

const SearchBar = ({ onSearch, onAutocomplete, handleDefault,searchQuery, setSearchQuery }) => {

  const [isLongQuery, setIsLongQuery] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(0);
  const [autocompleteResults, setAutocompleteResults] = useState([]);
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

        onSearch(text);
        onAutocomplete(text);

      }, 500);

      setTypingTimeout(newTimeout);

    } else {

      clearTimeout(typingTimeout);

    }

  };

  const handleAutocompleteSelect = (suggestion) => {

    setSearchQuery(suggestion);
    setAutocompleteResults([]);
    setShowSearchButton(false);

  };

  const handleHistoryClick = (historyItem) => {
    
    setSearchQuery(historyItem);

   
    setShowSearchButton(false);

    onSearch(historyItem);
    
  };

  const clearSearch = () => {

    setSearchQuery("");
    setShowSearchButton(false);
    handleDefault();

  };

  return (

    <div>

      <div className={classes.searchContainer}>

        <div>

          <input
            type="text"
            placeholder="Search for recipes..."
            value={searchQuery}
            onClick={() => setShowSearchButton(true)}
            onChange={handleChange}
            className={classes.searchInput}
          />

          {searchQuery && (

            <button className={classes.clearButton} onClick={clearSearch}>

              ❌

            </button>

          )}

        </div>

        {showSearchButton && isLongQuery && (
          <button onClick={handleSearch}>Search</button>
        )}
      </div>
      {searchHistory.length > 0 && showSearchButton && !isLongQuery && (
        <ul className="autocomplete-list">
          {searchHistory.map((historyItem, index) => (
            <li
              key={index}
              onClick={() => handleHistoryClick(historyItem)}
            >
              {historyItem}
            </li>
          ))}
        </ul>
      )}
      {autocompleteResults.length > 0 && (
        <ul className="autocomplete-list">
          {autocompleteResults.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleAutocompleteSelect(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
