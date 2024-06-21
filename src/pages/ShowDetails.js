import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SeasonSelector from '../Preview/SeasonSelector';
import EpisodeList from '../Preview/EpisodeList';
import './styles.css'; // Ensure styles are correctly imported

const ShowDetails = () => {
  const { showid } = useParams();
  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await fetch(`https://podcast-api.netlify.app/id/${showid}`);
        if (!response.ok) {
          throw new Error('Failed to fetch show details');
        }
        const showData = await response.json();
        setSelectedShow(showData);
        setSelectedSeason(showData.seasons[0]); // Default to first season
        setLoading(false);
      } catch (error) {
        console.error('Error fetching show details:', error);
        setLoading(false);
      }
    };

    fetchShowDetails();
  }, [showid]);

  const handleSeasonSelect = (seasonNumber) => {
    const season = selectedShow.seasons.find(s => s.number === seasonNumber);
    setSelectedSeason(season);
    setSelectedEpisode(null);
  };

  const handleEpisodeSelect = (episode) => {
    setSelectedEpisode(episode);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="show-details-page">
      {selectedShow && (
        <>
          <h2>{selectedShow.title}</h2>
          <SeasonSelector seasons={selectedShow.seasons} onSelectSeason={handleSeasonSelect} />
          {selectedSeason && (
            <>
              <h3>Season {selectedSeason.number}</h3>
              <img src={selectedSeason.image} alt={`Season ${selectedSeason.number}`} className="selected-season-image" />
              <EpisodeList episodes={selectedSeason.episodes} onEpisodeSelect={handleEpisodeSelect} />
            </>
          )}
          {selectedEpisode && (
            <div>
              <h4>Selected Episode: {selectedEpisode.name}</h4>
              {/* Render additional details for the selected episode */}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ShowDetails;
