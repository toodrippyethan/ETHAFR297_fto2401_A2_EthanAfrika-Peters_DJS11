import React, { useState } from 'react';
import Header from '../components/common/Header';
import InputComponent from '../components/common/InputComponent';
import AudioPlayer from '../components/common/AudioPlayer';  // Import the AudioPlayer component
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
  const [currentPodcast, setCurrentPodcast] = useState({audioSrc: '', image: ''});  // State to manage the current playing podcast

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
        {/* Example of rendering podcasts */}
        {/* This should be replaced with your actual podcast rendering logic */}
        {/** Replace the below section with your actual podcast data and mapping */}
        {dummyPodcasts.map(podcast => (
          <div key={podcast.id} onClick={() => playPodcast(podcast)}>
            <img src={podcast.image} alt={podcast.title} />
            <h2>{podcast.title}</h2>
          </div>
        ))}
      </div>
      {/* Add the AudioPlayer component here */}
      <AudioPlayer audioSrc={currentPodcast.audioSrc} image={currentPodcast.image} />
    </div>
  );
}

// Example of dummy podcast data
const dummyPodcasts = [
  {id: 1, title: 'Podcast 1', image: 'path-to-image-1', audioSrc: 'path-to-audio-1'},
  {id: 2, title: 'Podcast 2', image: 'path-to-image-2', audioSrc: 'path-to-audio-2'},
  // Add more podcasts here
];

export default PodcastsPage;
