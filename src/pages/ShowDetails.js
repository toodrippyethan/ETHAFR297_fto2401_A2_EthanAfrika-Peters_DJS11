// ShowDetails.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchShowById } from '../services/apiService';

const ShowDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const data = await fetchShowById(id);
        setShow(data);
      } catch (error) {
        console.error('Error fetching show details:', error);
      }
    };

    fetchShow();
  }, [id]);

  if (!show) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{show.title}</h1>
      <img src={show.image} alt={show.title} />
      <p>Description: {show.description}</p>
      <p>Genres: {show.genres.join(', ')}</p>
      <h2>Seasons:</h2>
      <ul>
        {show.seasons.map(season => (
          <li key={season.id}>
            <h3>Season {season.number}</h3>
            <p>Number of Episodes: {season.episodes.length}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowDetails;
