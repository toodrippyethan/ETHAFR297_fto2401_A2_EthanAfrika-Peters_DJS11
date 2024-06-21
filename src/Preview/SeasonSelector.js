import React from 'react';

const SeasonSelector = ({ seasons, onSelectSeason }) => {
  return (
    <div className="season-selector">
      <h3>Select Season:</h3>
      <select className="season-dropdown" onChange={(e) => onSelectSeason(parseInt(e.target.value))}>
        {seasons.map((season, index) => (
          <option key={season.number} value={season.number}>
            Season {index + 1}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SeasonSelector;
