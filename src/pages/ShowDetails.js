/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AudioPlayer from '../components/common/AudioPlayer'; // Assuming you have this component
import Loader from '../components/common/Loader'; // Adjust path as per your file structure
import './styles.css';
import Header from '../components/common/Header';

const ShowDetails = () => { 
  const { showid } = useParams();
  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [seasonLoading, setSeasonLoading] = useState(false); // State for season episodes loading

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await fetch(`https://podcast-api.netlify.app/id/${showid}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch show details: ${response.status} ${response.statusText}`);
        }
        const showData = await response.json();
        // Assigning season numbers ourselves
        showData.seasons = showData.seasons.map((season, index) => ({
          ...season,
          number: index + 1,
        }));
        setSelectedShow(showData);
        setSelectedSeason(showData.seasons[0]); // Default to first season
        setLoading(false);
        fetchSeasonEpisodes(showData.seasons[0].id); // Fetch episodes for the first season by default
      } catch (error) {
        console.error('Error fetching show details:', error);
        setLoading(false);
      }
    };

    fetchShowDetails();
  }, [showid]);

  const fetchSeasonEpisodes = async (seasonId) => {
    setSeasonLoading(true); // Set loading state for season episodes fetch

    try {
      const response = await fetch(`https://podcast-api.netlify.app/season/${seasonId}/episodes`);
      if (!response.ok) {
        throw new Error(`Failed to fetch season episodes: ${response.status} ${response.statusText}`);
      }
      const episodesData = await response.json();
      setSelectedSeason(prevSeason => ({
        ...prevSeason,
        episodes: episodesData // Assuming episodesData is an array of episode objects
      }));
    } catch (error) {
      console.error('Error fetching season episodes:', error);
    }

    setSeasonLoading(false); // Clear loading state after fetch
  };

  const handleSeasonSelect = async (seasonNumber) => {
    const season = selectedShow.seasons.find(s => s.number === seasonNumber);
    if (!season) {
      console.error('Selected season not found');
      return;
    }
    setSelectedSeason(season);
    setSelectedEpisode(null);

    // Fetch season episodes for the selected season
    await fetchSeasonEpisodes(season.id);
  };

  const handleEpisodeSelect = (episode) => {
    setSelectedEpisode(episode);
  };

  if (loading) {
    return <Loader />; // Display loader for initial loading
  }

  return (
    <div className="show-details-page">
      <Header />
      {selectedShow ? (
        <>
          <h2>{selectedShow.title}</h2>
          <div className="season-dropdown">
            <h3>Select Season:</h3>
            <select
              value={selectedSeason ? selectedSeason.number : ''}
              onChange={(e) => handleSeasonSelect(parseInt(e.target.value))}
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
              <img src={selectedSeason.image} alt={`Season ${selectedSeason.number}`} className="selected-season-image" />
              <p>Number of Episodes: {selectedSeason.episodes ? selectedSeason.episodes.length : 0}</p>
              {seasonLoading ? (
                <Loader /> // Display loader while fetching season episodes
              ) : (
                <div className="episode-list">
                  <h4>Episodes:</h4>
                  <ul>
                    {selectedSeason.episodes && selectedSeason.episodes.length > 0 ? (
                      selectedSeason.episodes.map(episode => (
                        <li key={episode.id} onClick={() => handleEpisodeSelect(episode)}>
                          {episode.name} {/* Adjust property based on your data */}
                        </li>
                      ))
                    ) : (
                      <li>No episodes available for this season</li>
                    )}
                  </ul>
                </div>
              )}
            </>
          )}
          {selectedEpisode && (
            <div className="selected-episode">
              <h4>Selected Episode:</h4>
              <p>{selectedEpisode.name}</p>
              <AudioPlayer audioSrc={selectedEpisode.audioSrc} image={selectedShow.image} />
            </div>
          )}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ShowDetails;
