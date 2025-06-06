const FAVORITES_KEY = "movieApp_favorites";

// Get favorites from localStorage
export const getFavoritesFromStorage = () => {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error("Error getting favorites from localStorage:", error);
    return [];
  }
};

// Save favorites to localStorage
export const saveFavoritesToStorage = (favorites) => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    return true;
  } catch (error) {
    console.error("Error saving favorites to localStorage:", error);
    return false;
  }
};

// Add movie to favorites
export const addToFavoritesStorage = (movie) => {
  try {
    const favorites = getFavoritesFromStorage();

    // Check if movie already exists
    const exists = favorites.some((fav) => fav.imdbID === movie.imdbID);

    if (!exists) {
      const updatedFavorites = [...favorites, movie];
      saveFavoritesToStorage(updatedFavorites);
      return updatedFavorites;
    }

    return favorites;
  } catch (error) {
    console.error("Error adding to favorites:", error);
    return getFavoritesFromStorage();
  }
};

// Remove movie from favorites
export const removeFromFavoritesStorage = (imdbID) => {
  try {
    const favorites = getFavoritesFromStorage();
    const updatedFavorites = favorites.filter(
      (movie) => movie.imdbID !== imdbID
    );
    saveFavoritesToStorage(updatedFavorites);
    return updatedFavorites;
  } catch (error) {
    console.error("Error removing from favorites:", error);
    return getFavoritesFromStorage();
  }
};

// Clear all favorites
export const clearFavoritesStorage = () => {
  try {
    localStorage.removeItem(FAVORITES_KEY);
    return true;
  } catch (error) {
    console.error("Error clearing favorites:", error);
    return false;
  }
};

// Check if movie is in favorites
export const isMovieInFavorites = (imdbID) => {
  try {
    const favorites = getFavoritesFromStorage();
    return favorites.some((movie) => movie.imdbID === imdbID);
  } catch (error) {
    console.error("Error checking if movie is in favorites:", error);
    return false;
  }
};
