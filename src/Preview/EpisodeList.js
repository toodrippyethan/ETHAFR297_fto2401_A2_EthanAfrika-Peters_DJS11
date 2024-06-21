import React from 'react';

const EpisodeList = ({ episodes, onEpisodeSelect }) => {
  return (
    <div className="episode-list">
      <h3>Episodes:</h3>
      <ul>
        {episodes.map(episode => (
          <li key={episode.id}>
            <button onClick={() => onEpisodeSelect(episode)}>
              {episode.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EpisodeList;
