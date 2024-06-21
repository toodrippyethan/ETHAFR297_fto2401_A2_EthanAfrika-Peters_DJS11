// components/common/PodcastCard/index.js
import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const PodcastCard = ({ podcast, onClick, onAddToFavorites }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(podcast);
    }
  };

  const handleAddToFavorites = () => {
    if (onAddToFavorites) {
      onAddToFavorites(podcast);
    }
  };

  return (
    <div className="podcast-card" onClick={handleClick}>
      <img src={podcast.image} alt={podcast.title} className="display-image-podcast" />
      <div className="podcast-details">
        <h2 className="title-podcast">{podcast.title}</h2>
        <div className="genres">
          <p><strong>Genres:</strong> {podcast.genres.join(', ')}</p>
          <p><strong>Seasons:</strong> {podcast.seasons}</p>
          <p><strong>Updated:</strong> {podcast.updated}</p>
          <button className="add-to-favorites-button" onClick={handleAddToFavorites}>Add to Favorites</button>
        </div>
      </div>
    </div>
  );
};

PodcastCard.propTypes = {
  podcast: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    seasons: PropTypes.number.isRequired,
    updated: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  onClick: PropTypes.func.isRequired,
  onAddToFavorites: PropTypes.func.isRequired,
};

export default PodcastCard;
