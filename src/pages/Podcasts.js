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
  const [filteredShows, setFilteredShows] = useState([]);

  useEffect(() => {
    dispatch(fetchAllShowsAsync());
  }, [dispatch]);

  useEffect(() => {
    let filtered = [...shows]; // Make a copy of the shows array

    if (selectedGenre) {
      filtered = filtered.filter(show => show.genres.includes(selectedGenre));
    }

    if (search) {
      filtered = filtered.filter(show =>
        show.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortOption === 'az') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'za') {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    }

    setFilteredShows(filtered);
  }, [shows, search, selectedGenre, sortOption]);

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
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : filteredShows.length > 0 ? (
          <div className="podcasts-flex">
            {filteredShows.map(show => (
              <PodcastCard
                key={show.id}
                id={show.id}
                title={show.title}
                displayImage={show.displayImage}
                genres={show.genres}
                numSeasons={show.numSeasons} // Assuming numSeasons is fetched from API
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
