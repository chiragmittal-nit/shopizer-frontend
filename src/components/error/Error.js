import React from 'react';

function Error({ errorMessage }) {
  return (
    <div className="mx-auto mt-4" style={{ width: '50%' }}>
      <div className="alert alert-danger " role="alert">
        {errorMessage}
      </div>
    </div>
  );
}

export default Error;
