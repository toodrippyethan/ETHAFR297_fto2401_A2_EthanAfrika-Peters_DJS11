import React, { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import InputComponent from '../components/common/InputComponent';
import AudioPlayer from '../components/common/AudioPlayer';
import PodcastCard from '../components/common/PodcastCard';
import '../components/common/Button/styles.css';

const PodcastsPage = () => {
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortOption, setSortOption] = useState('az');
  const [podcasts, setPodcasts] = useState([]);
  const [currentPodcast, setCurrentPodcast] = useState({ audioSrc: '', image: '' });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://podcast-api.netlify.app');
      const data = await response.json();
      setPodcasts(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchGenreDetails = async () => {
      // Map through each podcast and fetch genre details for each genre ID
      const updatedPodcasts = await Promise.all(
        podcasts.map(async (podcast) => {
          const updatedGenres = await Promise.all(
            podcast.genres.map(async (genreId) => {
              const genreResponse = await fetch(`https://podcast-api.netlify.app/genre/${genreId}`);
              const genreData = await genreResponse.json();
              return genreData.title; // Assuming genreData.title contains the genre title
            })
          );
          return { ...podcast, genres: updatedGenres };
        })
      );
      setPodcasts(updatedPodcasts);
    };

    fetchGenreDetails();
  }, [podcasts]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const playPodcast = (podcast) => {
    setCurrentPodcast(podcast);
  };

  const sortedPodcasts = [...podcasts].sort((a, b) => {
    if (sortOption === 'az') {
      return a.title.localeCompare(b.title);
    } else if (sortOption === 'za') {
      return b.title.localeCompare(a.title);
    }
    return 0;
  });

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
        {filteredPodcasts.map(podcast => (
          <PodcastCard key={podcast.id} podcast={podcast} onClick={() => playPodcast(podcast)} />
        ))}
      </div>
      <AudioPlayer audioSrc={currentPodcast.audioSrc} image={currentPodcast.image} />
    </div>
  );
};

export default PodcastsPage;
