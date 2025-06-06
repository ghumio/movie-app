import MovieCard from "./MovieCard";

function MovieGrid({
  movies,
  onAddToFavorites,
  onRemoveFromFavorites,
  isFavorite,
}) {
  // Handle empty state
  if (!movies || movies.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          isFavorite={isFavorite(movie.imdbID)}
          onAddToFavorites={onAddToFavorites}
          onRemoveFromFavorites={onRemoveFromFavorites}
        />
      ))}
    </div>
  );
}

// Empty State Component
function EmptyState() {
  return (
    <div className="empty-state">
      <div className="empty-state-content">
        <div className="empty-state-icon">🎬</div>
        <h3 className="empty-state-title">No Movies Found</h3>
        <p className="empty-state-description">
          Try searching for different movie titles or explore our popular movies
          collection.
        </p>
        <div className="empty-state-suggestions">
          <p>
            <strong>Search suggestions:</strong>
          </p>
          <ul>
            <li>Try broader terms like "action", "comedy", or "drama"</li>
            <li>
              Search for specific movie titles like "Inception" or "Avengers"
            </li>
            <li>Look for movies by year like "2023" or "2020"</li>
            <li>
              Search for TV series like "Breaking Bad" or "Game of Thrones"
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MovieGrid;
