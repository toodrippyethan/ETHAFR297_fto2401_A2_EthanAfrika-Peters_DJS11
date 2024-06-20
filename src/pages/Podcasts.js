import React, { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import PodcastCard from '../components/Podcasts/PodcastCard';
import InputComponent from '../components/common/Input';
import { fetchAllShows } from '../api'; // Import API function

function PodcastsPage() {
  const [shows, setShows] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchShows();
  }, []);

  const fetchShows = async () => {
    try {
      const showsData = await fetchAllShows();
      setShows(showsData);
    } catch (error) {
      console.error('Error fetching shows:', error);
      // Handle error state or show error message to the user
    }
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  // Filter shows based on search input
  const filteredShows = shows.filter((show) =>
    show.title.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <div>
      <Header />
      <div className="input-wrapper" style={{ marginTop: '2rem' }}>
        <h1>Discover Podcasts</h1>
        <InputComponent
          state={search}
          setState={handleSearchChange}
          placeholder="Search By Title"
          type="text"
        />

        {filteredShows.length > 0 ? (
          <div className="podcasts-flex" style={{ marginTop: '1.5rem' }}>
            {filteredShows.map((show) => (
              <PodcastCard
                key={show.id}
                id={show.id}
                title={show.title}
                displayImage={show.displayImage} // Adjust based on API response structure
              />
            ))}
          </div>
        ) : (
          <p>{search ? 'Show Not Found' : 'Loading...'}</p>
        )}
      </div>
    </div>
  );
}

export default PodcastsPage;
