import React from 'react';

const ShowPreview = ({ images }) => {
  return (
    <div className="show-preview">
      {images.map((image, index) => (
        <img key={index} src={image.url} alt={`Season ${index + 1}`} className="season-image" />
      ))}
    </div>
  );
};

export default ShowPreview;
