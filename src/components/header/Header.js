import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { logout } from '../../redux/slices/user';

import './Header.scss';

function Header({ totalQuantity, currentUser, logout, history }) {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link
          className="navbar-brand text-white"
          to="/"
          style={{ fontSize: '30px', fontWeight: '600' }}
        >
          Shopizer
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">
            <i className="fas fa-bars" style={{ color: 'white' }}></i>
          </span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav">
            {currentUser ? (
              <>
                {currentUser.isAdmin && (
                  <button className=" btn btn-secondary text-white">
                    <Link
                      className="text-white text-decoration-none"
                      to="/admin"
                    >
                      Admin Panel
                    </Link>
                  </button>
                )}
                <div className="dropdown">
                  <button
                    className="dropdown-toggle ml-3 btn btn-secondary "
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i
                      style={{ color: 'white' }}
                      className="fa fa-user"
                      aria-hidden="true"
                    ></i>{' '}
                    {currentUser.name}
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <Link className="dropdown-item" to="/me">
                      Profile
                    </Link>
                    <Link className="dropdown-item" to="/my-orders">
                      Orders
                    </Link>
                    <li
                      className="dropdown-item"
                      style={{ cursor: 'pointer' }}
                      onClick={() => logout()}
                    >
                      Logout <i className="fas fa-sign-out-alt"></i>
                    </li>
                  </div>
                </div>
              </>
            ) : (
              <li className="nav-item">
                <button className="  btn btn-secondary text-white font-weight-bold p-0">
                  <Link className="nav-link text-white" to="/login">
                    Login
                  </Link>
                </button>
              </li>
            )}

            <li className="nav-item ml-3">
              <Link className="nav-link text-white" to="/check-out">
                <i className="fas fa-shopping-cart"></i>{' '}
                {totalQuantity > 0 ? totalQuantity : ''}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

const mapStateToProps = (state) => {
  return {
    totalQuantity: state.cart.totalQuantity,
    currentUser: state.user.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => ({ logout: () => dispatch(logout()) });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
