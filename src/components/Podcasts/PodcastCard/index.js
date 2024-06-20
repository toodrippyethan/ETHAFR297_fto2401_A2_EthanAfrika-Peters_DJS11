import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles.css'; // Import your CSS file for PodcastCard styling
import { fetchGenreById } from '../../../api'; // Import your API function for fetching genre details

function PodcastCard({ id, title, displayImage, seasons, genres }) {
  const imageSrc = displayImage || "https://via.placeholder.com/150"; // Placeholder image URL
  const [genreNames, setGenreNames] = useState([]);

  useEffect(() => {
    const fetchGenreNames = async () => {
      try {
        if (genres && genres.length > 0) {
          const genrePromises = genres.map(async genre => {
            const genreData = await fetchGenreById(genre.id); // Assuming fetchGenreById returns genre details
            return genreData.name; // Assuming genreData has a name property
          });
          const resolvedGenres = await Promise.all(genrePromises);
          setGenreNames(resolvedGenres);
        }
      } catch (error) {
        console.error('Error fetching genre details:', error);
        // Handle error state or fallback
      }
    };

    fetchGenreNames();
  }, [genres]);

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
          <div className="title-and-season">
            <p className="title-podcast">{title}</p>
            {genres && genres.length > 0 && (
              <div className="genres">
                <p>Genres: {genreNames.join(', ')}</p>
              </div>
            )}
            {seasons && seasons.length > 0 && (
              <div className="seasons">
                <p>{seasons.length} {seasons.length === 1 ? 'Season' : 'Seasons'}</p>
                <ul>
                  {seasons.map((season, index) => (
                    <li key={index}>{season.title}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PodcastCard;
