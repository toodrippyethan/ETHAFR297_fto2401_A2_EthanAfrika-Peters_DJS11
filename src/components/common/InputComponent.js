import React from 'react';
import './Button/styles.css'; 

const InputComponent = ({ state, setState, placeholder, type }) => {
  return (
    <input
      className="custom-input"
      value={state}
      onChange={(e) => setState(e.target.value)}
      placeholder={placeholder}
      type={type}
    />
  );
};

export default InputComponent;
