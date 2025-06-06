import { useState, useEffect } from "react";

function SearchBar({ onSearch, onClear, initialQuery = "", isLoading }) {
  const [query, setQuery] = useState(initialQuery);

  // Update local state when initialQuery changes
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  // Handle search submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  // Handle clear button
  const handleClear = () => {
    setQuery("");
    onClear();
  };

  // Handle Enter key press
  // const handleKeyPress = (e) => {
  //   if (e.key === "Enter") {
  //     handleSubmit(e);
  //   }
  // };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-wrapper">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search for movies... (e.g., 'Avengers', 'Batman', 'Star Wars')"
            className="search-input"
            disabled={isLoading}
          />

          {/* Clear button - only show when there's text */}
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="clear-btn"
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className={`search-btn ${isLoading ? "loading" : ""}`}
        >
          {isLoading ? (
            <>
              <span className="spinner"></span>
              Searching...
            </>
          ) : (
            <>🔍 Search</>
          )}
        </button>
      </form>

      {/* Search suggestions */}
      <div className="search-suggestions">
        <span className="suggestions-label">Try searching for:</span>
        <button
          onClick={() => {
            setQuery("Marvel");
            onSearch("Marvel");
          }}
          className="suggestion-btn"
        >
          Marvel
        </button>
        <button
          onClick={() => {
            setQuery("Batman");
            onSearch("Batman");
          }}
          className="suggestion-btn"
        >
          Batman
        </button>
        <button
          onClick={() => {
            setQuery("Comedy");
            onSearch("Comedy");
          }}
          className="suggestion-btn"
        >
          Comedy
        </button>
        <button
          onClick={() => {
            setQuery("Horror");
            onSearch("Horror");
          }}
          className="suggestion-btn"
        >
          Horror
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
