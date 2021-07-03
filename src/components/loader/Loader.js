import React from 'react';

import './Loader.scss';

function Loader({ message }) {
  return (
    <div className="loader-overlay">
      <p className="loading-text">{message}</p>
      <div className="loader-container" />
    </div>
  );
}

export default Loader;
