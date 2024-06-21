// /src/components/common/PodcastCarousel.js

import React from 'react';
import PropTypes from 'prop-types';
import PodcastCard from './PodcastCard'; // Ensure this path is correct
import './carousel-styles.css'; // Assuming you have a CSS file for Carousel styling

const PodcastCarousel = ({ podcasts, onPodcastClick }) => {
  return (
    <div className="carousel-container">
      {podcasts.map(podcast => (
        <div key={podcast.id} className="carousel-item">
          <PodcastCard podcast={podcast} onClick={onPodcastClick} />
        </div>
      ))}
    </div>
  );
};

PodcastCarousel.propTypes = {
  podcasts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    seasons: PropTypes.number.isRequired,
    updated: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  })).isRequired,
  onPodcastClick: PropTypes.func.isRequired,
};

export default PodcastCarousel;
