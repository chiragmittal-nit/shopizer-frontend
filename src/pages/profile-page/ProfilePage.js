import React from 'react';
import { connect } from 'react-redux';
import { updateUserDetailsAsync } from '../../redux/slices/user';
import { getCurrentUser } from '../../services/authService';

function ProfilePage({ updateUserDetails, history }) {
  const currentUser = getCurrentUser();
  const [name, setName] = React.useState(currentUser.name);
  const [email, setEmail] = React.useState(currentUser.email);
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const handleUpdate = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPassword('');
      setConfirmPassword('');
      alert("passwords don't match");
      return;
    }

    const updatedUser = { _id: currentUser._id, name, email, password };
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    updateUserDetails(updatedUser);
  };

  return (
    <div>
      <div className="row justify-content-center m-3">
        <div
          className="col-md-5 card p-3 shadow p-3 mb-5 bg-white rounded"
          style={{ marginTop: '100px' }}
        >
          <div className="div">
            <h2 style={{ display: 'inline' }} className="text-center m-3">
              User Details
            </h2>
            <i
              style={{ fontSize: '25px' }}
              className="fa fa-user-plus"
              aria-hidden="true"
            ></i>

            {/* {loading && (<Loader/>)}
            {error && (<Error error ='Email Address is already registred' ></Error>)}
            {success && (<Success success='Your Registration is successfull' />)} */}

            <form onSubmit={handleUpdate}>
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
              <input
                type="email"
                placeholder="email"
                className="form-control"
                value={email}
                readOnly
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

              <div className="text-right">
                <button type="submit " className="btn btn-dark mt-3">
                  Update Details
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
  updateUserDetails: (user) => dispatch(updateUserDetailsAsync(user)),
});

export default connect(null, mapDispatchToProps)(ProfilePage);
