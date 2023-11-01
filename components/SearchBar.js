import React, { useEffect, useState } from "react";

const SearchBar = ({ onSearch, searchHistory, setSearchHistory }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHistoryItem, setSelectedHistoryItem] = useState("");
  const [searchHistoryVisible, setSearchHistoryVisible] = useState(false);

  const clearSearch = () => {
    setSearchTerm("");
    setSearchHistoryVisible(false);
  };

  const handleSearchClick = () => {
    if (searchTerm) {
      onSearch(searchTerm);
      setSearchHistory((prevHistory) => {
        const updatedHistory = [searchTerm, ...prevHistory].slice(0, 5);
        localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
        return updatedHistory;
      });
      setSelectedHistoryItem("");
      setSearchTerm("");
      setSearchHistoryVisible(false);
    }
  };

  const handleHistoryItemClick = (item) => {
    setSelectedHistoryItem(item);
    setSearchTerm(item);
    setSearchHistoryVisible(false);
  };

  return (
    <div className="absolute p-5 flex top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ zIndex: 1 }}>
      <div>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onClick={() => setSearchHistoryVisible(true)}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-2 py-2 border rounded-md border-gray-400 focus:outline-none focus:ring focus:border-blue-300 w-full max-w-xs"
        />
      </div>
      <div>
        <button
          className="ml-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          onClick={handleSearchClick}
        >
          Search
        </button>
      </div>
      <div>
        <button
          className="ml-2 bg-blue-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          onClick={clearSearch}
        >
          Clear
        </button>
      </div>
      {searchHistoryVisible && searchHistory.length > 0 && (
        <div className="bg-white p-1 border border-gray-300 rounded mt-1" style={{ maxHeight: "50px", maxWidth: "200px", overflowY: "auto" }}>
          <p className="text-gray-600 text-sm">Previous Searches:</p>
          <ul className="list-disc list-inside text-sm ml-2">
            {searchHistory.map((item, index) => (
              <span
                className={`text-blue-500 hover:underline ${selectedHistoryItem === item ? "font-bold" : ""}`}
                onClick={() => handleHistoryItemClick(item)}
                key={index}
              >
                <li key={index} className="mt-1">
                  {item}
                </li>
              </span>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
