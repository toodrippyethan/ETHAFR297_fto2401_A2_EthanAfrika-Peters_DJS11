import React from 'react';

const SeasonSelector = ({ seasons, onSelectSeason }) => {
  return (
    <div className="season-selector">
      <h3>Select Season:</h3>
      <ul>
        {seasons.map(season => (
          <li key={season.number}>
            <button onClick={() => onSelectSeason(season.number)}>
              Season {season.number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SeasonSelector;
