// PodcastsPage.js
import React, { useState } from 'react';
import Header from '../components/common/Header';
import InputComponent from '../components/common/InputComponent';
import '../components/common/Button/styles.css'; // Ensure you import the styles here

const genres = [
  'Personal Growth',
  'Investigative Journalism',
  'History',
  'Comedy',
  'Entertainment',
  'Business',
  'Fiction',
  'News',
  'Kids and Family',
];

function PodcastsPage() {
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortOption, setSortOption] = useState('');

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <div>
      <Header />
      <div className="input-wrapper">
        <h1>Discover Podcasts</h1>
        <div className="search-and-dropdown">
          <div className="search-input">
            <InputComponent
              state={search}
              setState={handleSearchChange}
              placeholder="Search By Title"
              type="text"
            />
          </div>
          <div className="dropdown-wrapper">
            <label htmlFor="sortDropdown" className="label-input"></label>
            <select
              id="sortDropdown"
              value={sortOption}
              onChange={handleSortChange}
              className="dropdown-select"
            >
              <option value="">Sort By</option>
              <option value="az">A-Z</option>
              <option value="za">Z-A</option>
            </select>
          </div>
        </div>
        <div className="dropdown-wrapper center">
          <label htmlFor="genreDropdown" className="label-input"></label>
          <select
            id="genreDropdown"
            value={selectedGenre}
            onChange={handleGenreChange}
            className="dropdown-select"
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default PodcastsPage;
