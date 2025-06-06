import { NavLink } from "react-router-dom";

function Navigation({ favoritesCount }) {
  return (
    <nav className="navigation">
      <div className="nav-links">
        <NavLink to="/" className="nav-link">
          🎬 Browse Movies
        </NavLink>
        <NavLink to="/favorites" className="nav-link">
          ❤️ Favorites
          {favoritesCount > 0 && (
            <span className="favorites-count">{favoritesCount}</span>
          )}
        </NavLink>
      </div>
    </nav>
  );
}

export default Navigation;
