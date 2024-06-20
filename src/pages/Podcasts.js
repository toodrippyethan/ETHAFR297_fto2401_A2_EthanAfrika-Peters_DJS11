import React, { useEffect, useState } from 'react';
import Header from '../components/common/Header';
import PodcastCard from '../components/Podcasts/PodcastCard';
import InputComponent from '../components/common/Input';
import { useSelector, useDispatch } from 'react-redux';
import { sortShowsAZ, sortShowsZA, fetchAllShowsAsync, setPodcasts } from '../slices/podcastSlice'; // Import Redux actions

function PodcastsPage() {
  const dispatch = useDispatch();
  const shows = useSelector((state) => state.podcasts.shows);
  const loading = useSelector((state) => state.podcasts.loading);
  const [search, setSearch] = useState('');
  const [sortOption, setSortOption] = useState(''); // State to store selected sorting option

  useEffect(() => {
    dispatch(fetchAllShowsAsync()); // Fetch all shows when component mounts
  }, [dispatch]);

  const handleSortChange = (event) => {
    const selectedOption = event.target.value;
    setSortOption(selectedOption);

    if (selectedOption === 'az') {
      dispatch(sortShowsAZ());
    } else if (selectedOption === 'za') {
      dispatch(sortShowsZA());
    }
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    // Dispatch action to set filtered podcasts here if needed
    const filteredPodcasts = shows.filter((item) =>
      item.title.toLowerCase().includes(event.target.value.toLowerCase())
    );
    dispatch(setPodcasts(filteredPodcasts));
  };

  // Filter shows based on search criteria
  const filteredShows = shows.filter((show) =>
    show.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Header />
      <div className="input-wrapper" style={{ marginTop: '2rem' }}>
        <h1>Discover Podcasts</h1>
        <div className="input-and-dropdown">
          <div className="search-input">
            <InputComponent
              state={search}
              setState={handleSearchChange}
              placeholder="Search By Title"
              type="text"
            />
          </div>
          <div className="dropdown-wrapper">
            <select
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

        {loading ? (
          <p>Loading...</p>
        ) : filteredShows.length > 0 ? (
          <div className="podcasts-flex" style={{ marginTop: '1.5rem' }}>
            {filteredShows.map((show) => (
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
