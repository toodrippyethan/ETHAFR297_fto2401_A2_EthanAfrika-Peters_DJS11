import React from 'react';

const SeasonSelector = ({ seasons, onSelectSeason }) => {
  return (
    <div className="season-selector">
      <h3>Select Season:</h3>
      <select onChange={(e) => onSelectSeason(parseInt(e.target.value))}>
        {seasons.map(season => (
          <option key={season.number} value={season.number}>
            Season {season.number}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SeasonSelector;
