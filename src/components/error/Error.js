import React from 'react';

function Error({ message }) {
  return (
    <div className="mx-auto mt-4" style={{ width: '50%' }}>
      <div className="alert alert-danger " role="alert">
        {message}
      </div>
    </div>
  );
}

export default Error;
