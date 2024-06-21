import React, { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import InputComponent from '../components/common/InputComponent';
import AudioPlayer from '../components/common/AudioPlayer';
import PodcastCard from '../components/common/PodcastCard'; // Import PodcastCard component
import '../components/common/Button/styles.css'; // Ensure you import the styles here

function PodcastsPage() {
  const [podcasts, setPodcasts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    // Fetch podcasts data from API or mock data
    // Replace with actual fetch logic to retrieve podcasts from API
    const fetchPodcasts = async () => {
      // Example fetch request
      try {
        // Replace with your API endpoint for getting podcasts
        const response = await fetch('https://podcast-api.netlify.app');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPodcasts(data); // Assuming data is an array of podcasts from API
      } catch (error) {
        console.error('Error fetching podcasts:', error);
        // Handle error
      }
    };

    fetchPodcasts();
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  // Function to sort podcasts based on sortOption (A-Z or Z-A)
  const sortedPodcasts = () => {
    let sorted = [...podcasts];
    if (sortOption === 'az') {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'za') {
      sorted.sort((a, b) => b.title.localeCompare(a.title));
    }
    return sorted;
  };

  // Function to filter podcasts based on search and selected genre
  const filteredPodcasts = () => {
    let filtered = [...podcasts];
    if (search.trim() !== '') {
      filtered = filtered.filter(podcast =>
        podcast.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (selectedGenre !== '') {
      filtered = filtered.filter(podcast =>
        podcast.genres.includes(selectedGenre)
      );
    }
    return filtered;
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
      <div className="podcast-list">
        {/* Render the filtered and sorted podcasts */}
        {filteredPodcasts().map((podcast) => (
          <PodcastCard key={podcast.id} podcast={podcast} />
        ))}
      </div>
      {/* Add the AudioPlayer component here */}
      <AudioPlayer />
    </div>
  );
}

// Example of dummy podcast data
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

// Example of dummy podcast data
const dummyPodcasts = [
  { id: 1, title: 'Podcast 1', image: 'path-to-image-1', genres: ['Comedy', 'Entertainment'], seasons: 3 },
  { id: 2, title: 'Podcast 2', image: 'path-to-image-2', genres: ['Business', 'News'], seasons: 2 },
  // Add more podcasts here
];

export default PodcastsPage;
