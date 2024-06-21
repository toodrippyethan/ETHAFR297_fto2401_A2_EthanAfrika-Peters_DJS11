import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EpisodeList from '../Preview/EpisodeList';
import AudioPlayer from '../components/common/AudioPlayer';
import '../index.css';

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
      {selectedShow ? (
        <>
          <h2>{selectedShow.title}</h2>
          <div className="season-preview">
            {selectedShow.seasons.map(season => (
              <button key={season.number} onClick={() => handleSeasonSelect(season.number)}>
                <img src={season.image} alt={`Season ${season.number}`} />
                <p>Season {season.number}</p>
                <p>{season.episodes.length} Episodes</p>
              </button>
            ))}
          </div>
          {selectedSeason && (
            <>
              <h3>Season {selectedSeason.number}</h3>
              <img src={selectedSeason.image} alt={`Season ${selectedSeason.number}`} className="selected-season-image" />
              <EpisodeList
                episodes={selectedSeason.episodes}
                onEpisodeSelect={handleEpisodeSelect}
              />
            </>
          )}
          {selectedEpisode && (
            <AudioPlayer audioSrc={selectedEpisode.audioSrc} image={selectedShow.image} />
          )}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ShowDetails;
