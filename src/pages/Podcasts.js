import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import InputComponent from '../components/common/InputComponent';
import AudioPlayer from '../components/common/AudioPlayer';
import PodcastCard from '../components/common/PodcastCard';
import ShowPreview from '../Preview/ShowPreview';
import SeasonSelector from '../Preview/SeasonSelector';
import EpisodeList from '../Preview/EpisodeList';
import './styles.css';

const PodcastsPage = () => {
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortOption, setSortOption] = useState('az');
  const [podcasts, setPodcasts] = useState([]);
  const [currentPodcast, setCurrentPodcast] = useState({ audioSrc: '', image: '' });
  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const navigate = useNavigate(); // Hook for programmatic navigation

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://podcast-api.netlify.app');
        if (!response.ok) {
          throw new Error('Failed to fetch podcasts');
        }
        const data = await response.json();

        const formattedPodcasts = data.map(podcast => ({
          ...podcast,
          updated: new Date(podcast.updated).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }),
          genres: podcast.genres.map(genreId => {
            return fetch(`https://podcast-api.netlify.app/genre/${genreId}`)
              .then(response => response.json())
              .then(genreData => genreData.title)
              .catch(error => {
                console.error('Error fetching genre:', error);
                return 'Unknown Genre';
              });
          })
        }));

        Promise.all(formattedPodcasts.map(podcast =>
          Promise.all(podcast.genres)
            .then(genres => ({
              ...podcast,
              genres
            }))
        ))
          .then(updatedPodcasts => {
            setPodcasts(updatedPodcasts);
          });
      } catch (error) {
        console.error('Error fetching podcasts:', error);
      }
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

  const handleSortByUpdate = (event) => {
    const sortBy = event.target.value;
    const sortedPodcasts = [...podcasts].sort((a, b) => {
      const dateA = new Date(a.updated);
      const dateB = new Date(b.updated);
      if (sortBy === 'most-recent') {
        return dateB - dateA;
      } else if (sortBy === 'least-recent') {
        return dateA - dateB;
      }
      return 0;
    });
    setPodcasts(sortedPodcasts);
  };

  const playPodcast = (podcast) => {
    setCurrentPodcast(podcast);
  };

  const clearSelection = () => {
    setSelectedShow(null);
    setSelectedSeason(null);
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

  const handleShowSelect = (show) => {
    setSelectedShow(show);
    navigate(`/show/${show.id}`); // Navigate to show details page
  };

  const handleSeasonSelect = (season) => {
    setSelectedSeason(season);
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
          <div className="sort-dropdown-wrapper">
            <label htmlFor="sortDropdown" className="label-input">Sort By</label>
            <select
              id="sortDropdown"
              value={sortOption}
              onChange={handleSortChange}
              className="dropdown-select"
            >
              <option value="az">Sort By</option>
              <option value="az">A-Z</option>
              <option value="za">Z-A</option>
            </select>
          </div>
          <div className="filter-and-sort">
            <div className="genre-dropdown-wrapper">
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
            <div className="update-dropdown-wrapper">
              <label htmlFor="updateDropdown" className="label-input">Sort By Update</label>
              <select
                id="updateDropdown"
                className="dropdown-select"
                onChange={handleSortByUpdate}
              >
                <option value="most-recent">Newly Updated Shows</option>
                <option value="least-recent">Oldest Updated Shows</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="podcast-list">
        {filteredPodcasts.map(podcast => (
          <Link key={podcast.id} to={`/show/${podcast.id}`}>
            <PodcastCard podcast={podcast} onClick={() => handleShowSelect(podcast)} />
          </Link>
        ))}
      </div>
      {selectedShow && (
        <div className="show-details">
          <h2>{selectedShow.title} Seasons</h2>
          <ShowPreview images={selectedShow.seasonImages} />
          <SeasonSelector seasons={selectedShow.seasons} onSelectSeason={handleSeasonSelect} />
          {selectedSeason && (
            <EpisodeList episodes={selectedShow.episodes[selectedSeason - 1]} />
          )}
        </div>
      )}
      <AudioPlayer audioSrc={currentPodcast.audioSrc} image={currentPodcast.image} />
    </div>
  );
};

export default PodcastsPage;
