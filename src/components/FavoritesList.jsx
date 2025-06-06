function FavoritesList({ favorites, onRemoveFromFavorites }) {
  // Handle empty favorites
  if (!favorites || favorites.length === 0) {
    return <EmptyFavorites />;
  }

  return (
    <div className="favorites-list">
      <div className="favorites-header">
        <h3 className="favorites-title">
          ❤️ Your Favorites ({favorites.length})
        </h3>
        <p className="favorites-subtitle">Your personal movie collection</p>
      </div>

      <div className="favorites-content">
        {favorites.map((movie) => (
          <FavoriteItem
            key={movie.imdbID}
            movie={movie}
            onRemove={() => onRemoveFromFavorites(movie.imdbID)}
          />
        ))}
      </div>

      {/* Favorites Stats */}
      <div className="favorites-stats">
        <div className="stat-item">
          <span className="stat-number">{favorites.length}</span>
          <span className="stat-label">Total Favorites</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">
            {new Set(favorites.map((m) => m.Year)).size}
          </span>
          <span className="stat-label">Different Years</span>
        </div>
      </div>
    </div>
  );
}

// Individual Favorite Item Component
function FavoriteItem({ movie, onRemove }) {
  const handleImageError = (e) => {
    e.target.style.display = "none";
    e.target.nextSibling.style.display = "flex";
  };

  return (
    <div className="favorite-item">
      <div className="favorite-poster">
        {movie.Poster && movie.Poster !== "N/A" ? (
          <>
            <img
              src={movie.Poster}
              alt={`${movie.Title} poster`}
              className="favorite-poster-img"
              onError={handleImageError}
              loading="lazy"
            />
            <div
              className="favorite-poster-placeholder"
              style={{ display: "none" }}
            >
              🎬
            </div>
          </>
        ) : (
          <div className="favorite-poster-placeholder">🎬</div>
        )}
      </div>

      <div className="favorite-info">
        <h4 className="favorite-title" title={movie.Title}>
          {movie.Title}
        </h4>
        <div className="favorite-meta">
          <span className="favorite-year">{movie.Year}</span>
          {movie.Type && (
            <span className="favorite-type">
              • {movie.Type.charAt(0).toUpperCase() + movie.Type.slice(1)}
            </span>
          )}
        </div>
        {movie.Genre && (
          <div className="favorite-genre">
            <small>{movie.Genre}</small>
          </div>
        )}
      </div>

      <div className="favorite-actions">
        <button
          onClick={onRemove}
          className="remove-favorite-btn"
          title="Remove from favorites"
        >
          ❌
        </button>
      </div>
    </div>
  );
}

// Empty Favorites Component
function EmptyFavorites() {
  return (
    <div className="empty-favorites">
      <div className="empty-favorites-content">
        <div className="empty-favorites-icon">💔</div>
        <h3 className="empty-favorites-title">No Favorites Yet</h3>
        <p className="empty-favorites-description">
          Start building your personal movie collection by clicking the heart
          icon on any movie!
        </p>
        <div className="empty-favorites-tips">
          <h4>💡 Tips:</h4>
          <ul>
            <li>Click the 🤍 icon to add movies to favorites</li>
            <li>Your favorites are saved automatically</li>
            <li>Access them anytime from the favorites view</li>
            <li>Build your personal watchlist</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FavoritesList;
