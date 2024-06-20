import React, { useState } from 'react';
import Header from '../components/common/Header';
import PodcastCard from '../components/Podcasts/PodcastCard';
import InputComponent from '../components/common/Input';
import { useSelector } from 'react-redux'; // Import useSelector for Redux state access

function PodcastsPage() {
  const podcasts = useSelector((state) => state.podcasts.podcasts); // Get podcasts from Redux state
  const [search, setSearch] = useState('');

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  // Filter shows based on search input
  const filteredPodcasts = podcasts.filter((podcast) =>
    podcast.title.toLowerCase().includes(search.trim().toLowerCase())
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

        {filteredPodcasts.length > 0 ? (
          <div className="podcasts-flex" style={{ marginTop: '1.5rem' }}>
            {filteredPodcasts.map((podcast) => (
              <PodcastCard
                key={podcast.id}
                id={podcast.id}
                title={podcast.title}
                displayImage={podcast.displayImage} // Adjust based on API response structure
              />
            ))}
          </div>
        ) : (
          <p>{search ? 'Podcast Not Found' : 'No Podcasts On The Platform'}</p>
        )}
      </div>
    </div>
  );
}

export default PodcastsPage;
