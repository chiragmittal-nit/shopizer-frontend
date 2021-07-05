import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function ProtectedRoute({ path, currentUser, component: Component, render }) {
  return (
    <Route
      path={path}
      render={(props) => {
        if (currentUser)
          return Component ? <Component {...props} /> : render(props);
        else {
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

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});
export default connect(mapStateToProps)(ProtectedRoute);
