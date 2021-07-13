import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getCurrentUser } from '../../services/authService';

function ProtectedRoute({ path, component: Component, render, admin }) {
  return (
    <Route
      path={path}
      render={(props) => {
        if (getCurrentUser()) {
          console.log(admin);
          if (admin && getCurrentUser().isAdmin === false) {
            return <Redirect to="/" />;
          } else return Component ? <Component {...props} /> : render(props);
        } else {
          console.log(props.location);
          return (
            // see rrd documentation of Redirect
            <Redirect
              to={{
                pathname: '/login',
                state: { referrer: props.location },
              }}
            />
          );
        }
      }}
    />
  );
}

export default ProtectedRoute;
