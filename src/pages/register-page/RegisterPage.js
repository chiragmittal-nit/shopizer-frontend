import React from 'react';
import { connect } from 'react-redux';
import { registerUserAsync } from '../../redux/slices/user';

function RegisterPage({ registerUser, history }) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPassword('');
      setConfirmPassword('');
      alert("passwords don't match");
      return;
    }

    const user = { name, email, password };
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    registerUser(user);
  };

  return (
    <div>
      <div className="row justify-content-center m-3">
        <div
          className="col-md-5 card p-3 shadow p-3 mb-5 bg-white rounded"
          style={{ marginTop: '100px' }}
        >
          <div className="div">
            <h2 style={{ display: 'inline' }} className="text-center m-2">
              Register
            </h2>
            <i
              style={{ fontSize: '22px' }}
              className="fa fa-user-plus"
              aria-hidden="true"
            ></i>

            {/* {loading && (<Loader/>)}
            {error && (<Error error ='Email Address is already registred' ></Error>)}
            {success && (<Success success='Your Registration is successfull' />)} */}

            <form className="mt-3" onSubmit={handleRegister}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="name"
                  className="form-control"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
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

              <div className="form-group">
                <input
                  type="password"
                  placeholder="confirm password"
                  className="form-control"
                  value={confirmPassword}
                  required
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
              </div>

              <div>
                <button type="submit" className="btn btn-dark mt-3">
                  REGISTER
                </button>
              </div>
            </form>
          </div>
          <a style={{ color: 'black' }} href="/login" className="m-3">
            Click Here To Login
          </a>
        </div>
      </div>
    </div>
  );
}

// const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  registerUser: (user) => dispatch(registerUserAsync(user)),
});

export default connect(null, mapDispatchToProps)(RegisterPage);
