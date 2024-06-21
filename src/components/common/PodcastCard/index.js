// PodcastCard.js

import React from 'react';
import PropTypes from 'prop-types';
import './styles.css'; // Assuming you have a CSS file for PodcastCard styling

const PodcastCard = ({ podcast, onClick }) => {
  return (
    <div className="podcast-card" onClick={onClick}>
      <img src={podcast.image} alt={podcast.title} className="display-image-podcast" />
      <div className="podcast-details">
        <h2 className="title-podcast">{podcast.title}</h2>
        <div className="genres">
          <p>Genres: {podcast.genres.join(', ')}</p> {/* Displaying genres */}
          <p>Seasons: {podcast.seasons}</p> {/* Displaying seasons */}
          <p>Updated: {podcast.updated}</p> {/* Displaying updated date */}
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
    updated: PropTypes.string.isRequired, // Assuming updated is a string in the format you desire
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  onClick: PropTypes.func.isRequired,
};

export default PodcastCard;
