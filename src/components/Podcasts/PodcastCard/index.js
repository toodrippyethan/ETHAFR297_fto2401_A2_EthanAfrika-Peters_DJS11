import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";

function PodcastCard({ id, title, displayImage }) {
  const imageSrc = displayImage || "https://via.placeholder.com/150"; // Placeholder image URL

  return (
    <Link to={`/podcast/${id}`} className="podcast-link">
      <div className="podcast-card">
        <img
          className="display-image-podcast"
          src={imageSrc}
          alt={title}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/150"; // Replace with placeholder on error
          }}
        />
        <p className="title-podcast">{title}</p>
      </div>
    </Link>
  );
}

export default PodcastCard;
