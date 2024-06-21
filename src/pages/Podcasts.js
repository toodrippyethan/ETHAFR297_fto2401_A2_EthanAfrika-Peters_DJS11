/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Header from '../components/common/Header';
import InputComponent from '../components/common/InputComponent';
import PodcastCard from '../components/common/PodcastCard';
import Favorites from './Favorites'; // Assuming Favorites component is in the same directory
import './styles.css';

const PodcastsPage = () => {
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortOption, setSortOption] = useState('az');
  const [sortByUpdateOption, setSortByUpdateOption] = useState('');
  const [podcasts, setPodcasts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://podcast-api.netlify.app');
        if (!response.ok) {
          throw new Error('Failed to fetch podcasts');
        }
        const data = await response.json();

        const podcastsWithGenres = await Promise.all(
          data.map(async podcast => {
            const genres = await Promise.all(
              podcast.genres.map(async genreId => {
                const genreResponse = await fetch(`https://podcast-api.netlify.app/genre/${genreId}`);
                if (!genreResponse.ok) {
                  console.error('Error fetching genre:', genreResponse.statusText);
                  return 'Unknown Genre';
                }
                const genreData = await genreResponse.json();
                return genreData.title;
              })
            );
            return {
              ...podcast,
              updated: new Date(podcast.updated).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              }),
              genres
            };
          })
        );

        setPodcasts(podcastsWithGenres);
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

  const handleSortByUpdateChange = (event) => {
    setSortByUpdateOption(event.target.value);
  };

  const handleAddToFavorites = (podcast) => {
    const newFavorite = {
      podcast,
      favoritedAt: new Date().toLocaleString()
    };
    setFavorites([...favorites, newFavorite]);
  };

  const removeFromFavorites = (podcast) => {
    const updatedFavorites = favorites.filter(fav => fav.podcast.id !== podcast.id);
    setFavorites(updatedFavorites);
  };

  const getSortedPodcasts = () => {
    let sortedPodcasts = [...podcasts];

    sortedPodcasts = sortedPodcasts.sort((a, b) => {
      if (sortOption === 'az') {
        return a.title.localeCompare(b.title);
      } else if (sortOption === 'za') {
        return b.title.localeCompare(a.title);
      }
      return 0;
    });

    sortedPodcasts = sortedPodcasts.sort((a, b) => {
      const dateA = new Date(a.updated);
      const dateB = new Date(b.updated);
      if (sortByUpdateOption === 'most-recent') {
        return dateB - dateA;
      } else if (sortByUpdateOption === 'least-recent') {
        return dateA - dateB;
      }
      return 0;
    });

    return sortedPodcasts;
  };

  const filteredPodcasts = getSortedPodcasts().filter(podcast => {
    return (
      podcast.title.toLowerCase().includes(search.toLowerCase()) &&
      (selectedGenre === '' || podcast.genres.includes(selectedGenre))
    );
  });

  const handleCardClick = (podcastId) => {
    navigate(`/show/${podcastId}`);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };

  return (
    <div>
      <Header />
      <Slider {...settings}>
        {filteredPodcasts.map(podcast => (
          <div key={podcast.id}>
            <img src={podcast.image} alt={podcast.title} />
            <h3>{podcast.title}</h3>
          </div>
        ))}
      </Slider>
      <div className="input-wrapper">
        <h1>Discover Podcasts</h1>
        <div className="search-and-dropdown">
          <div className="search-input">
            <InputComponent
              value={search}
              onChange={handleSearchChange}
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
                value={sortByUpdateOption}
                onChange={handleSortByUpdateChange}
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
          <PodcastCard
            key={podcast.id}
            podcast={podcast}
            onAddToFavorites={handleAddToFavorites}
            onClick={() => handleCardClick(podcast.id)} // Handle card click navigation
          />
        ))}
      </div>
      <Favorites favorites={favorites} removeFromFavorites={removeFromFavorites} showHeader={false} />
    </div>
  );
};

export default PodcastsPage;
