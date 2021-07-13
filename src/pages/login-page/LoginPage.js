import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loginUserAsync } from '../../redux/slices/user';
import auth from '../../services/authService';
import Error from './../../components/error/Error';

function LoginPage({ loginUser, error }) {
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
  };

  return (
    <div>
      <div className="row justify-content-center m-3">
        <div
          className="col-md-4 card p-3 shadow p-3 mb-5 bg-white rounded"
          style={{ marginTop: '100px' }}
        >
          <div>
            <h2 style={{ display: 'inline' }} className="text-center m-2">
              Login
            </h2>
            <i
              style={{ fontSize: '24px' }}
              className="fas fa-sign-in-alt"
              aria-hidden="true"
            ></i>

            {error && <Error message={error} />}

            <form className="mt-3" onSubmit={handleLogin}>
              <div className="form-group">
                {' '}
                <input
                  type="email"
                  placeholder="email"
                  className="form-control"
                  aria-describedby="emailHelp"
                  value={email}
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <small id="emailHelp" class="form-text text-left text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group">
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
              </div>
              <div>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
