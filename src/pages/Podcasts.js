import React, { useEffect, useState } from 'react';
import Header from '../components/common/Header';
import PodcastCard from '../components/Podcasts/PodcastCard';
import InputComponent from '../components/common/Input';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllShowsAsync, setPodcasts, sortShowsAZ, sortShowsZA } from '../slices/podcastSlice';

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
  const dispatch = useDispatch();
  const shows = useSelector((state) => state.podcasts.shows);
  const loading = useSelector((state) => state.podcasts.loading);
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    dispatch(fetchAllShowsAsync());
  }, [dispatch]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    // You can filter shows based on title here if needed
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
    // Filter shows by selected genre
    const filteredShows = shows.filter(show =>
      show.genres.includes(event.target.value)
    );
    dispatch(setPodcasts(filteredShows));
  };

  const handleSortChange = (event) => {
    const selectedOption = event.target.value;
    setSortOption(selectedOption);
    if (selectedOption === 'az') {
      dispatch(sortShowsAZ());
    } else if (selectedOption === 'za') {
      dispatch(sortShowsZA());
    }
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
            <label htmlFor="sortDropdown"></label>
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
        <div className="dropdown-wrapper" style={{ marginTop: '1rem' }}>
          <label htmlFor="genreDropdown"></label>
          <select
            id="genreDropdown"
            value={selectedGenre}
            onChange={handleGenreChange}
            className="dropdown-select"
          >
            <option value="">All Genres</option>
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : shows.length > 0 ? (
          <div className="podcasts-flex">
            {shows.map(show => (
              <PodcastCard
                key={show.id}
                id={show.id}
                title={show.title}
                displayImage={show.displayImage}
              />
            ))}
          </div>
        ) : (
          <p>No shows found.</p>
        )}
      </div>
    </div>
  );
}

export default PodcastsPage;
