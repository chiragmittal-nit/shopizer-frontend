import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loginUserAsync } from '../../redux/slices/user';
import auth from '../../services/authService';
import Error from './../../components/error/Error';

function LoginPage({ loginUser, history, location, error }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  React.useEffect(() => {
    console.log(auth.getCurrentUser());
    if (auth.getCurrentUser()) window.location = '/';
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const credentials = { email, password };
    setEmail('');
    setPassword('');
    loginUser(credentials);
    if (!error) {
      const { state } = location;
      window.location = state ? state.referrer.pathname : '/';
    }
  };

  return (
    <div>
      <div className="row justify-content-center m-3">
        <div
          className="col-md-4 card p-3 shadow p-3 mb-5 bg-white rounded"
          style={{ marginTop: '100px' }}
        >
          <div className="div">
            <h2 style={{ display: 'inline' }} className="text-center m-3">
              Login
            </h2>
            <i
              style={{ fontSize: '25px' }}
              className="fa fa-user-plus"
              aria-hidden="true"
            ></i>

            {error && <Error message={error} />}

            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="email"
                className="form-control"
                value={email}
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />

              <input
                type="password"
                placeholder="password"
                className="form-control"
                value={password}
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              <div className="text-right">
                <button type="submit" className="btn btn-dark mt-3">
                  LOGIN
                </button>
              </div>
            </form>
          </div>
          <a style={{ color: 'black' }} href="/register" className="m-3">
            Click Here To Register
          </a>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ user }) => ({
  error: user.error,
});

const mapDispatchToProps = (dispatch) => ({
  loginUser: (credentials) => dispatch(loginUserAsync(credentials)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginPage)
);
