import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useFavorites } from "./hooks/useFavorites";
import Navigation from "./components/Navigation";
import BrowseMovies from "./pages/BrowseMovies";
import FavoritesPage from "./pages/FavoritesPage";
import "./App.css";

function App() {
  // Custom hook for favorites management
  const { favorites, addToFavorites, removeFromFavorites, isFavorite } =
    useFavorites();

  return (
    <Router>
      <div className="app">
        {/* Header */}
        <header className="app-header">
          <h1 className="app-title">Movie Search & Favorites</h1>
          <p className="app-subtitle">
            Discover movies and build your collection
          </p>
        </header>

        {/* Navigation Bar */}
        <Navigation favoritesCount={favorites.length} />

        {/* Main Content */}
        <main className="main-content">
          <Routes>
            {/* Browse Movies Route */}
            <Route
              path="/"
              element={
                <BrowseMovies
                  favorites={favorites}
                  addToFavorites={addToFavorites}
                  removeFromFavorites={removeFromFavorites}
                  isFavorite={isFavorite}
                />
              }
            />

            {/* Favorites Page Route */}
            <Route
              path="/favorites"
              element={
                <FavoritesPage
                  favorites={favorites}
                  removeFromFavorites={removeFromFavorites}
                  isFavorite={isFavorite}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
