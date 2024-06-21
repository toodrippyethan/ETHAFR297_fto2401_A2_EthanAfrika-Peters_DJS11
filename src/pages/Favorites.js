// Favorites.js
import React from 'react';

const Favorites = ({ favorites, removeFromFavorites, showHeader = true }) => {
  return (
    <div className="favorites">
      {showHeader && (
        <h2>Favorite Episodes</h2>
      )}
      <ul>
        {favorites.map((favorite) => (
          <li key={favorite.podcast.id}>
            <div>
              <h3>{favorite.podcast.title}</h3>
              <button onClick={() => removeFromFavorites(favorite.podcast)}>
                Remove from Favorites
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
