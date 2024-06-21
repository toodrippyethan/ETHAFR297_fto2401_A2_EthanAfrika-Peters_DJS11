import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EpisodeList from '../Preview/EpisodeList';
import AudioPlayer from '../components/common/AudioPlayer';
import Header from '../components/common/Header';
import './styles.css';

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
      <Header />
      {selectedShow ? (
        <>
          <h2>{selectedShow.title}</h2>
          <div className="season-preview">
            {/* Dropdown to select seasons */}
            <select
              value={selectedSeason ? selectedSeason.number : ''}
              onChange={(e) => handleSeasonSelect(Number(e.target.value))}
            >
              {selectedShow.seasons.map(season => (
                <option key={season.number} value={season.number}>
                  Season {season.number}
                </option>
              ))}
            </select>
          </div>
          {selectedSeason && (
            <>
              <h3>Season {selectedSeason.number}</h3>
              <img
                src={selectedSeason.image}
                alt={`Season ${selectedSeason.number}`}
                className="selected-season-image"
              />
              <p>{selectedSeason.description}</p>
              {/* List of episodes */}
              <ul>
                {selectedSeason.episodes.map((episode, index) => (
                  <li key={index} onClick={() => handleEpisodeSelect(episode)}>
                    {episode.title}
                  </li>
                ))}
              </ul>
              {/* Audio player for selected episode */}
              {selectedEpisode && (
                <AudioPlayer audioSrc={selectedEpisode.audioSrc} image={selectedShow.image} />
              )}
            </>
          )}
        </>
      ) : (
        <div>Error</div>
      )}
    </div>
  );
};

export default ShowDetails;
