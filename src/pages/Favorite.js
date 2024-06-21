import React, { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import { FaTrash } from 'react-icons/fa';

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFromFavorites = (id) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div>
      <Header />
      <div className="input-wrapper">
        <h1>Favorites</h1>
        {favorites.map((fav) => (
          <div key={fav.id} className="favorite-item">
            <div>
              <p><strong>Title:</strong> {fav.title}</p>
              <p><strong>Description:</strong> {fav.description}</p>
            </div>
            <div className="favorite-actions">
              <button onClick={() => removeFromFavorites(fav.id)}><FaTrash /> Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorite;
