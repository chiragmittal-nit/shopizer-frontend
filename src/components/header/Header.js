import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { logout } from '../../redux/slices/user';

import './Header.scss';

function Header({ totalQuantity, currentUser, logout, history }) {
  return (
    <nav className='navbar navbar-expand-lg'>
      <div className='container-fluid'>
        <Link className='navbar-brand fs-4 text-white' to='/'>
          Shopizer
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div
          className='collapse navbar-collapse justify-content-end'
          id='navbarSupportedContent'
        >
          <ul className='navbar-nav'>
            {currentUser ? (
              <div className='dropdown'>
                <button
                  className='btn btn-secondary dropdown-toggle'
                  type='button'
                  id='dropdownMenuButton'
                  data-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='false'
                >
                  <i
                    style={{ color: 'white' }}
                    className='fa fa-user'
                    aria-hidden='true'
                  ></i>{' '}
                  {currentUser.name}
                </button>
                <div
                  className='dropdown-menu'
                  aria-labelledby='dropdownMenuButton'
                >
                  <Link className='dropdown-item' to='/profile'>
                    Profile
                  </Link>
                  <Link className='dropdown-item' to='/orders'>
                    Orders
                  </Link>
                  <li
                    className='dropdown-item'
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      history.replace('/');
                      logout();
                    }}
                  >
                    Logout <i className='fas fa-sign-out-alt'></i>
                  </li>
                </div>
              </div>
            ) : (
              <li className='nav-item'>
                <Link className='nav-link text-white' to='/login'>
                  Login
                </Link>
              </li>
            )}

            <li className='nav-item'>
              <Link className='nav-link text-white' to='/check-out'>
                <i className='fas fa-shopping-cart'></i>{' '}
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

const mapDispatchToProps = (dispatch) => ({ logout: () => dispatch(logout) });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
