import React from 'react';

const PodcastDetails = ({ episode, onAddToFavorites, onRemoveFromFavorites }) => {
  const handleAddToFavorites = () => {
    onAddToFavorites(episode);
  };

  const handleRemoveFromFavorites = () => {
    onRemoveFromFavorites(episode);
  };

  return (
    <div className="podcast-details">
      <h3>{episode.title}</h3>
      <p>Season: {episode.season}</p>
      <p>Show: {episode.show}</p>
      <button onClick={handleAddToFavorites}>Add to Favorites</button>
      <button onClick={handleRemoveFromFavorites}>Remove from Favorites</button>
    </div>
  );
};

export default PodcastDetails;
