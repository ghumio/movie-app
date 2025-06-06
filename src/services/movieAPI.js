const API_KEY = "802b6591";
const BASE_URL = "https://www.omdbapi.com/";

// List of popular movies to show on homepage (20 movies)
const POPULAR_MOVIES = [
  "Avengers: Endgame",
  "The Dark Knight",
  "Inception",
  "Pulp Fiction",
  "The Shawshank Redemption",
  "Forrest Gump",
  "The Matrix",
  "Titanic",
  "Avatar",
  "Star Wars",
  "Jurassic Park",
  "The Lion King",
  "Spider-Man",
  "Iron Man",
  "Batman Begins",
  "The Godfather",
  "Gladiator",
  "The Lord of the Rings",
  "Harry Potter",
  "Pirates of the Caribbean",
];

// Search movies function
export const searchMovies = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.Response === "False") {
      throw new Error(data.Error || "No movies found");
    }

    return data.Search || [];
  } catch (error) {
    console.error("Error searching movies:", error);
    throw new Error(error.message || "Failed to search movies");
  }
};

// Get popular movies for homepage
export const getPopularMovies = async () => {
  try {
    const moviePromises = POPULAR_MOVIES.map(async (title) => {
      try {
        const response = await fetch(
          `${BASE_URL}?apikey=${API_KEY}&t=${encodeURIComponent(
            title
          )}&type=movie`
        );

        if (!response.ok) {
          return null;
        }

        const data = await response.json();

        if (data.Response === "True") {
          return data;
        }
        return null;
      } catch (error) {
        console.error(`Error fetching ${title}:`, error);
        return null;
      }
    });

    const results = await Promise.all(moviePromises);

    // Filter out null results and return valid movies
    const validMovies = results.filter((movie) => movie !== null);

    if (validMovies.length === 0) {
      throw new Error("Failed to load popular movies");
    }

    return validMovies;
  } catch (error) {
    console.error("Error loading popular movies:", error);
    throw new Error("Failed to load popular movies");
  }
};

// Get movie details by ID
export const getMovieDetails = async (imdbID) => {
  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.Response === "False") {
      throw new Error(data.Error || "Movie not found");
    }

    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw new Error(error.message || "Failed to fetch movie details");
  }
};
