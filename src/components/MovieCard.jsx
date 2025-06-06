import { useState } from "react";

function MovieCard({
  movie,
  isFavorite,
  onAddToFavorites,
  onRemoveFromFavorites,
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Handle poster image loading
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Handle poster image error
  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  // Handle favorite button click
  const handleFavoriteClick = () => {
    if (isFavorite) {
      onRemoveFromFavorites(movie.imdbID);
    } else {
      onAddToFavorites(movie);
    }
  };

  // Check if poster is available
  const hasValidPoster = movie.Poster && movie.Poster !== "N/A" && !imageError;

  return (
    <div className="movie-card">
      {/* Movie Poster */}
      <div className="movie-poster-container">
        {hasValidPoster ? (
          <>
            {!imageLoaded && (
              <div className="poster-loading">
                <div className="poster-skeleton"></div>
              </div>
            )}
            <img
              src={movie.Poster}
              alt={`${movie.Title} poster`}
              className={`movie-poster ${imageLoaded ? "loaded" : "loading"}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="lazy"
            />
          </>
        ) : (
          <div className="poster-placeholder">
            <div className="poster-icon">🎬</div>
            <span className="no-image-text">No Image Available</span>
          </div>
        )}

        {isFavorite && <div className="favorite-badge">❤️</div>}
      </div>

      {/* Movie Information */}
      <div className="movie-info">
        <h3 className="movie-title" title={movie.Title}>
          {movie.Title}
        </h3>

        <div className="movie-meta">
          <span className="movie-year">{movie.Year}</span>
          {movie.Type && (
            <span className="movie-type">
              {movie.Type.charAt(0).toUpperCase() + movie.Type.slice(1)}
            </span>
          )}
        </div>

        {movie.Genre && (
          <div className="movie-genre">
            <small>{movie.Genre}</small>
          </div>
        )}

        {movie.Plot && movie.Plot !== "N/A" && (
          <div className="movie-plot">
            <p>
              {movie.Plot.length > 100
                ? `${movie.Plot.substring(0, 100)}...`
                : movie.Plot}
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="movie-actions">
        <button
          onClick={handleFavoriteClick}
          className={`favorite-btn ${
            isFavorite ? "favorited" : "not-favorited"
          }`}
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <span className="favorite-icon">{isFavorite ? "❤️" : "🤍"}</span>
          <span className="favorite-text">
            {isFavorite ? "Remove" : "Add to Favorites"}
          </span>
        </button>

        {movie.imdbID && (
          <a
            href={`https://www.imdb.com/title/${movie.imdbID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="imdb-link"
            title="View on IMDb"
          >
            IMDb
          </a>
        )}
      </div>
    </div>
  );
}

export default MovieCard;
