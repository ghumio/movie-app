import { useState, useEffect, useCallback } from "react";
import {
  getFavoritesFromStorage,
  addToFavoritesStorage,
  removeFromFavoritesStorage,
  isMovieInFavorites,
} from "../services/localStorage";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    try {
      const storedFavorites = getFavoritesFromStorage();
      setFavorites(storedFavorites);
    } catch (error) {
      console.error("Error loading favorites:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Add movie to favorites
  const addToFavorites = useCallback((movie) => {
    try {
      const updatedFavorites = addToFavoritesStorage(movie);
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error("Error adding movie to favorites:", error);
    }
  }, []);

  // Remove movie from favorites
  const removeFromFavorites = useCallback((imdbID) => {
    try {
      const updatedFavorites = removeFromFavoritesStorage(imdbID);
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error("Error removing movie from favorites:", error);
    }
  }, []);

  // Check if movie is in favorites
  const isFavorite = useCallback((imdbID) => {
    return isMovieInFavorites(imdbID);
  }, []);

  // Toggle favorite status
  const toggleFavorite = useCallback(
    (movie) => {
      if (isFavorite(movie.imdbID)) {
        removeFromFavorites(movie.imdbID);
      } else {
        addToFavorites(movie);
      }
    },
    [isFavorite, addToFavorites, removeFromFavorites]
  );

  // Clear all favorites
  const clearAllFavorites = useCallback(() => {
    try {
      setFavorites([]);
      localStorage.removeItem("movieApp_favorites");
    } catch (error) {
      console.error("Error clearing all favorites:", error);
    }
  }, []);

  // Get favorite by ID
  const getFavoriteById = useCallback(
    (imdbID) => {
      return favorites.find((movie) => movie.imdbID === imdbID);
    },
    [favorites]
  );

  // Get favorites count
  const favoritesCount = favorites.length;

  return {
    favorites,
    favoritesCount,
    isLoading,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
    clearAllFavorites,
    getFavoriteById,
  };
};
