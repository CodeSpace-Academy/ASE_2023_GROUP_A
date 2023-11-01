import React, { useState} from "react";
import classes from './searchBar.module.css'

const SearchBar = ({ onSearch, onAutocomplete, handleDefault }) => {

  const [searchQuery, setSearchQuery] = useState("");
  const [isLongQuery, setIsLongQuery] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(0);
  const [autocompleteResults, setAutocompleteResults] = useState([]);

  const handleSearch = () => {

    if (isLongQuery) {

      onSearch(searchQuery);
      
    }

  };

  const handleChange = (e) => {

    const text = e.target.value;
    setSearchQuery(text);
    setIsLongQuery(text.length > 4);

    if (text.length <= 4) {

      clearTimeout(typingTimeout);

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

  };

  const clearSearch = () => {

    setSearchQuery("");
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
            onChange={handleChange}
            className={classes.searchInput}
          />

          {searchQuery && (

            <button className={classes.clearButton} onClick={clearSearch}>

              &#x2715;
              
            </button>
          )}

        </div>

        {isLongQuery ? (

          <button onClick={handleSearch}>Search</button>

        ) : null}

      </div>

      {autocompleteResults.length > 0 && (

        <ul className="autocomplete-list">

          {autocompleteResults.map((suggestion, index) => (

            <li key={index} onClick={() => handleAutocompleteSelect(suggestion)}>

              {suggestion}

            </li>

          ))}

        </ul>

      )}

    </div>

  );

};

export default SearchBar;