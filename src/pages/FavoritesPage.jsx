import MovieGrid from "../components/MovieGrid";

function FavoritesPage({ favorites, removeFromFavorites, isFavorite }) {
  if (!favorites || favorites.length === 0) {
    return (
      <div className="empty-movies">
        <div className="empty-favorites-content">
          <div className="empty-favorites-icon">💔</div>
          <h2 className="empty-favorites-title">No Favorites Yet</h2>
          <p className="empty-favorites-description">
            Start building your personal movie collection by adding movies to
            your favorites!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <div className="page-header">
        <h2 className="page-title">Your Favorites ({favorites.length})</h2>
      </div>

      <MovieGrid
        movies={favorites}
        onAddToFavorites={() => {}}
        onRemoveFromFavorites={removeFromFavorites}
        isFavorite={isFavorite}
      />
    </div>
  );
}

export default FavoritesPage;
