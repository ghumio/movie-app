import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import MovieGrid from "../components/MovieGrid";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { searchMovies, getPopularMovies } from "../services/movieAPI";

function BrowseMovies({ addToFavorites, removeFromFavorites, isFavorite }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadPopularMovies();
  }, []);

  const loadPopularMovies = async () => {
    setIsLoading(true);
    setError("");

    try {
      const popularMovies = await getPopularMovies();
      setMovies(popularMovies);
    } catch (err) {
      setError("Failed to load popular movies. Please try again later.");
      console.error("Error loading popular movies:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (query) => {
    if (!query.trim()) {
      loadPopularMovies();
      return;
    }

    setIsLoading(true);
    setError("");
    setSearchQuery(query);

    try {
      const searchResults = await searchMovies(query);
      setMovies(searchResults);
    } catch (err) {
      setError(err.message);
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    loadPopularMovies();
  };

  return (
    <div className="browse-movies">
      <div className="search-section">
        <SearchBar
          onSearch={handleSearch}
          onClear={clearSearch}
          initialQuery={searchQuery}
          isLoading={isLoading}
        />
      </div>

      {error && <ErrorMessage message={error} />}

      {isLoading && <LoadingSpinner />}

      {!isLoading && !error && (
        <>
          <div className="page-header">
            <h2 className="page-title">
              {searchQuery
                ? `Search Results for "${searchQuery}" (${movies.length})`
                : `Popular Movies (${movies.length})`}
            </h2>
            {searchQuery && (
              <button onClick={clearSearch} className="clear-search-btn">
                Clear Search
              </button>
            )}
          </div>

          {movies.length > 0 ? (
            <MovieGrid
              movies={movies}
              onAddToFavorites={addToFavorites}
              onRemoveFromFavorites={removeFromFavorites}
              isFavorite={isFavorite}
            />
          ) : (
            <div className="empty-movies">
              <div className="empty-favorites-content">
                <div className="empty-favorites-icon">🔍</div>
                <h2 className="empty-favorites-title">
                  {searchQuery ? "No Movies Found" : "No Movies Available"}
                </h2>
                <p className="empty-favorites-description">
                  {searchQuery
                    ? `No movies found for "${searchQuery}". Try searching with different keywords.`
                    : "Unable to load movies at the moment. Please try again later."}
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default BrowseMovies;
