import React from 'react';

const Favorites = ({ favorites, removeFromFavorites }) => {
  // Guard against favorites being undefined or not iterable
  if (!favorites || favorites.length === 0) {
    return <div>No favorites yet!</div>;
  }

  return (
    <div>
      <h2>Favorites</h2>
      {favorites.map(favorite => (
        <div key={favorite.episode.id}>
          <p>{favorite.show} - {favorite.season}</p>
          <button onClick={() => removeFromFavorites(favorite.episode)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default Favorites;
