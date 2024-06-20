import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/common/Header';
import { fetchShowById } from '../api'; // Import API function for fetching show details

function PodcastDetails() {
  const { id } = useParams(); // Get ID from route params
  const [podcast, setPodcast] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPodcastDetails = async () => {
      try {
        const podcastData = await fetchShowById(id); // Fetch podcast details using API function
        setPodcast(podcastData);
        setLoading(false);
      } catch (error) {
        console.error(`Error fetching podcast ${id}:`, error);
        setPodcast(null); // Handle error state or show error message
        setLoading(false);
      }
    };

    fetchPodcastDetails();

    // Cleanup function
    return () => {
      // Perform cleanup if necessary
    };
  }, [id]);

  if (loading) {
    return <p>Loading...</p>; // Show loading state while fetching data
  }

  if (!podcast) {
    return <p>No such Podcast!</p>; // Handle case where podcast data is not available
  }

  const formattedLastUpdated = new Date(podcast.lastUpdated).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div>
      <Header />
      <div className="podcast-details">
        <h1>{podcast.title}</h1>
        <img src={podcast.displayImage} alt={podcast.title} />
        <div className="details">
          {podcast.seasons && podcast.seasons.length > 0 && (
            <div className="seasons">
              <p>{podcast.seasons.length} {podcast.seasons.length === 1 ? 'Season' : 'Seasons'}</p>
              <ul>
                {podcast.seasons.map((season, index) => (
                  <li key={index}>{season.title}</li>
                ))}
              </ul>
            </div>
          )}
          {podcast.genres&& podcast.genres.length > 0 && (
            <div className="genres">
              <p>Genres: {podcast.genres.map(genre => genre.name).join(', ')}</p>
            </div>
          )}
          <p>Last Updated: {formattedLastUpdated}</p>
        </div>
        <p>Description: {podcast.description}</p>
        {/* Render other podcast details as needed */}
      </div>
    </div>
  );
}

export default PodcastDetails;
