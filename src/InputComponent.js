import React from 'react';

function InputComponent({ state, setState, placeholder, type }) {
  return (
    <input
      type={type}
      value={state}
      onChange={(e) => setState(e)}
      placeholder={placeholder}
    />
  );
}

export default InputComponent;
