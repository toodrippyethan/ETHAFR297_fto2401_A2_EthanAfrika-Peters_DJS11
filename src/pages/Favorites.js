import React from 'react';

const Favorites = ({ favorites, removeFromFavorites }) => {
  if (!favorites || favorites.length === 0) {
    return <div>No favorites selected yet.</div>;
  }

  return (
    <div className="favorites">
      <h2>Favorite Episodes</h2>
      <ul>
        {favorites.map((favorite, index) => (
          <li key={index}>
            {favorite.episode.title} {/* Assuming episode has a 'title' property */}
            <button onClick={() => removeFromFavorites(favorite.episode)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
