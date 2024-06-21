import React from 'react';
import './styles.css'; // Import the CSS styles for PodcastCard

const PodcastCard = ({ podcast }) => {
  return (
    <div className="podcast-card">
      <img src={podcast.image} alt={podcast.title} className="display-image-podcast" />
      <div className="podcast-details">
        <h2 className="title-podcast">{podcast.title}</h2>
        <p className="seasons">Seasons: {podcast.seasons}</p>
        <div className="genres">
          <p>Genres: {podcast.genres.join(', ')}</p>
        </div>
      </div>
    </div>
  );
};

export default PodcastCard;
