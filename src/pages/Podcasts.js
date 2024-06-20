import React, { useState, useEffect } from "react";
import Header from "../components/common/Header";
import PodcastCard from "../components/Podcasts/PodcastCard";
import InputComponent from "../components/common/Input";

const mockPodcasts = [
  {
    id: 1,
    title: "Show A",
    displayImage: "image_url_a.jpg",
    genres: ["Comedy", "Drama"],
    seasons: [
      { id: 1, displayImage: "season1_image.jpg", episodeCount: 10 },
      { id: 2, displayImage: "season2_image.jpg", episodeCount: 12 },
    ],
  },
  {
    id: 2,
    title: "Show B",
    displayImage: "image_url_b.jpg",
    genres: ["Sci-Fi", "Fantasy"],
    seasons: [
      { id: 1, displayImage: "season1_image_b.jpg", episodeCount: 8 },
    ],
  },
  // Add more mock data as needed
];

function PodcastsPage() {
  const [podcasts, setPodcasts] = useState(mockPodcasts);
  const [search, setSearch] = useState("");
  const [activeGenre, setActiveGenre] = useState(null); // Track active genre

  useEffect(() => {
    // Mock API call or data initialization
    // Simulating API data fetching and setting state
    setPodcasts(mockPodcasts);
  }, []);

  // Filter podcasts based on search and active genre
  let filteredPodcasts = podcasts.filter(
    (item) =>
      item.title.toLowerCase().includes(search.trim().toLowerCase()) &&
      (activeGenre ? item.genres.includes(activeGenre) : true)
  );

  return (
    <div>
      <Header />
      <div className="input-wrapper" style={{ marginTop: "2rem" }}>
        <h1>Discover Podcasts</h1>
        <div style={{ marginBottom: "1rem" }}>
          <InputComponent
            state={search}
            setState={setSearch}
            placeholder="Search By Title"
            type="text"
          />
          {/* Button to filter by genre */}
          <div style={{ display: "inline-block", marginLeft: "1rem" }}>
            <button
              onClick={() => setActiveGenre(null)}
              style={{
                marginRight: "0.5rem",
                fontWeight: activeGenre === null ? "bold" : "normal",
              }}
            >
              All Genres
            </button>
            {["Comedy", "Drama", "Sci-Fi", "Fantasy"].map((genre) => (
              <button
                key={genre}
                onClick={() => setActiveGenre(genre)}
                style={{
                  marginRight: "0.5rem",
                  fontWeight: activeGenre === genre ? "bold" : "normal",
                }}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {filteredPodcasts.length > 0 ? (
          <div className="podcasts-flex" style={{ marginTop: "1.5rem" }}>
            {filteredPodcasts.map((item) => (
              <PodcastCard
                key={item.id}
                id={item.id}
                title={item.title}
                displayImage={item.displayImage}
              />
            ))}
          </div>
        ) : (
          <p>{search ? "Podcast Not Found" : "No Podcasts Found"}</p>
        )}

        {/* Additional details (genres and season images) */}
        {filteredPodcasts.map((podcast) => (
          <div key={podcast.id}>
            <h3>{podcast.title}</h3>
            <p>Genres: {podcast.genres.join(", ")}</p>
            {podcast.seasons.map((season) => (
              <div key={season.id}>
                <img
                  src={season.displayImage}
                  alt={`Season ${season.id} Image`}
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
                <p>Episodes: {season.episodeCount}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PodcastsPage;
