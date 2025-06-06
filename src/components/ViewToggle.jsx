function ViewToggle({ viewMode, setViewMode, favoritesCount }) {
  return (
    <div className="view-toggle">
      <div className="toggle-container">
        <button
          onClick={() => setViewMode("all")}
          className={`toggle-btn ${viewMode === "all" ? "active" : ""}`}
        >
          <span className="toggle-icon">🎬</span>
          <span className="toggle-text">All Movies</span>
          <span className="toggle-badge">Browse</span>
        </button>

        <button
          onClick={() => setViewMode("favorites")}
          className={`toggle-btn ${viewMode === "favorites" ? "active" : ""}`}
        >
          <span className="toggle-icon">❤️</span>
          <span className="toggle-text">My Favorites</span>
          <span className="toggle-badge">{favoritesCount}</span>
        </button>
      </div>

      <div className="view-description">
        {viewMode === "all" ? (
          <p>Discover and search through thousands of movies</p>
        ) : (
          <p>Your personal collection of favorite movies</p>
        )}
      </div>
    </div>
  );
}

export default ViewToggle;
