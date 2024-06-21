import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
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
  const [sortByUpdateOption, setSortByUpdateOption] = useState('');
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

  const getSortedPodcasts = () => {
    let sortedPodcasts = [...podcasts];

    // Sort by title
    sortedPodcasts = sortedPodcasts.sort((a, b) => {
      if (sortOption === 'az') {
        return a.title.localeCompare(b.title);
      } else if (sortOption === 'za') {
        return b.title.localeCompare(a.title);
      }
      return 0;
    });

    // Sort by update date
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

  const handleShowSelect = (show) => {
    setSelectedShow(show);
    navigate(`/show/${show.id}`); // Navigate to show details page
  };

  const handleSeasonSelect = (season) => {
    setSelectedSeason(season);
  };

  // Sample carousel data
  const carouselData = [
    { id: 10716, title: 'Something Was Wrong', image: 'https://content.production.cdn.art19.com/images/cc/e5/0a/08/cce50a08-d77d-490e-8c68-17725541b0ca/9dcebd4019d57b9551799479fa226e2a79026be5e2743c7aef19eac53532a29d66954da6e8dbdda8219b059a59c0abe6dba6049892b10dfb2f25ed90d6fe8d9a.jpeg' },
    { id: 9177, title: 'Killer Psyche', image: 'https://content.production.cdn.art19.com/images/68/4e/03/af/684e03af-29c5-4a35-b84a-d929f114caee/4f60eec3fabd62251d0cdbd1af11b79c43fb1465dbc5ec3371328fbddadee597e9f115c31b079e20266648ee07a80a93c01cecdb81ab3545d872393997594ef3.png' },
    { id: 8514, title: 'Against The Odds', image: 'https://content.production.cdn.art19.com/images/a3/77/2c/e4/a3772ce4-34f7-431d-bf80-968f555b7003/6c099d5ec76b40bb54e72a75c1dcbc44c5c13a764114fb5183fe7eecd201619fca37cf3dd029c2fc320fb1a3cfab716d94297cbe7bb32ead208b779579015683.png' },
    { id: 5276, title: 'Accused', image: 'https://content.production.cdn.art19.com/images/b3/37/52/bb/b33752bb-585a-47dc-a431-3aef17aacd66/b68b3e4a2e030d4f7ac3a518f4872e2f2985d04a130064bfb41034afe3c15824adafcbd488ce90463876b5b20bc589ead5c8c87b1c614a409d3affe444b2a0e0.jpeg' },
    { id: 5718, title: 'Over My Dead Body', image: 'https://content.production.cdn.art19.com/images/59/93/d1/5a/5993d15a-b461-4418-97e6-96736913b9f0/cda3367cea57818b96d72a71a8a0d3de9287679c68b4e9f8775f0f764b04da2e2699cbe689f70118d232dd99875acfe3d4b7e00b8c3155f613b7b55f9aa0193a.png' }
  ];

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
        {carouselData.map(item => (
          <div key={item.id}>
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
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
          <PodcastCard key={podcast.id} podcast={podcast} onClick={() => handleShowSelect(podcast)} />
        ))}
      </div>
      {selectedShow && (
        <div className="show-details">
          <h2>{selectedShow.title} Seasons</h2>
          <ShowPreview images={selectedShow.seasonImages} />
          <SeasonSelector seasons={selectedShow.seasons} onSelectSeason={handleSeasonSelect} />
          {selectedSeason && (
            <EpisodeList episodes={selectedSeason.episodes} />
          )}
        </div>
      )}
      <AudioPlayer audioSrc={currentPodcast.audioSrc} image={currentPodcast.image} />
    </div>
  );
};

export default PodcastsPage;
