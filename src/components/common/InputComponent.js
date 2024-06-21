import React from 'react';

const InputComponent = ({ value, onChange, placeholder, type }) => {
  return (
    <input
      className="custom-input"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
    />
  );
};

export default InputComponent;
