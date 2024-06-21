import React from 'react';

const EpisodeList = ({ episodes, onEpisodeSelect }) => {
  return (
    <div className="episode-list">
      <h4>Episodes:</h4>
      <ul>
        {episodes.map(episode => (
          <li key={episode.id} onClick={() => onEpisodeSelect(episode)}>
            {episode.name} {/* Ensure 'name' is the correct property */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EpisodeList;
