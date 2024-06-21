import React, { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import InputComponent from '../components/common/InputComponent';
import AudioPlayer from '../components/common/AudioPlayer';  // Import the AudioPlayer component
import PodcastCard from '../components/common/PodcastCard';  // Import the PodcastCard component
import './styles.css'; // Ensure you import the styles here

const PodcastsPage = () => {
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortOption, setSortOption] = useState('az');
  const [podcasts, setPodcasts] = useState([]);
  const [currentPodcast, setCurrentPodcast] = useState({ audioSrc: '', image: '' });  // State to manage the current playing podcast

  useEffect(() => {
    // Simulated fetch from API
    const fetchData = async () => {
      // Replace with actual API call
      // Example fetch call
      const response = await fetch('https://podcast-api.netlify.app');
      const data = await response.json();
      setPodcasts(data);
    };

    fetchData();
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

  // Function to play a podcast (This should be updated to the actual podcast data structure)
  const playPodcast = (podcast) => {
    setCurrentPodcast(podcast);
  };

  // Function to sort podcasts based on title
  const sortedPodcasts = [...podcasts].sort((a, b) => {
    if (sortOption === 'az') {
      return a.title.localeCompare(b.title);
    } else if (sortOption === 'za') {
      return b.title.localeCompare(a.title);
    }
    return 0;
  });

  // Filter podcasts based on search query and selected genre
  const filteredPodcasts = sortedPodcasts.filter(podcast => {
    return (
      podcast.title.toLowerCase().includes(search.toLowerCase()) &&
      (selectedGenre === '' || podcast.genres.includes(selectedGenre))
    );
  });

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
            <label htmlFor="sortDropdown" className="label-input">Sort By</label>
            <select
              id="sortDropdown"
              value={sortOption}
              onChange={handleSortChange}
              className="dropdown-select"
            >
              <option value="az">A-Z</option>
              <option value="za">Z-A</option>
            </select>
          </div>
        </div>
        <div className="dropdown-wrapper center">
          <label htmlFor="genreDropdown" className="label-input">Filter By Genre</label>
          <select
            id="genreDropdown"
            value={selectedGenre}
            onChange={handleGenreChange}
            className="dropdown-select"
          >
            <option value="">All Genres</option>
            <option value="Personal Growth">Personal Growth</option>
            <option value="Investigative Journalism">Investigative Journalism</option>
            <option value="History">History</option>
            <option value="Comedy">Comedy</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Business">Business</option>
            <option value="Fiction">Fiction</option>
            <option value="News">News</option>
            <option value="Kids and Family">Kids and Family</option>
          </select>
        </div>
      </div>
      <div className="podcast-list">
        {/* Map through filtered and sorted podcasts to render PodcastCard */}
        {filteredPodcasts.map(podcast => (
          <PodcastCard key={podcast.id} podcast={podcast} onClick={() => playPodcast(podcast)} />
        ))}
      </div>
      {/* Add the AudioPlayer component here */}
      <AudioPlayer audioSrc={currentPodcast.audioSrc} image={currentPodcast.image} />
    </div>
  );
};

export default PodcastsPage;
