import React from 'react';

import './Loader.scss';

function Loader() {
  return (
    <div className='loader-overlay'>
      <p className='loading-text'>Getting the good stuff!!</p>
      <div className='loader-container' />
    </div>
  );
}

export default Loader;
