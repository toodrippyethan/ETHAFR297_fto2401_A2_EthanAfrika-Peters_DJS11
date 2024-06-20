import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css'; // Import your CSS file for PodcastCard styling

function PodcastCard({ id, title, displayImage, genres, numSeasons }) {
  const imageSrc = displayImage || "https://via.placeholder.com/150"; // Placeholder image URL

  return (
    <Link to={`/podcast/${id}`} className="podcast-link">
      <div className="podcast-card">
        <img
          className="display-image-podcast"
          src={imageSrc}
          alt={title}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/150"; // Replace with placeholder on error
          }}
        />
        <div className="podcast-details">
          <p className="title-podcast">{title}</p>
          {genres && (
            <div className="genres">
              <p>{genres.join(', ')}</p>
            </div>
          )}
          {numSeasons && (
            <div className="seasons-info">
              <p>{numSeasons} Seasons</p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default PodcastCard;
