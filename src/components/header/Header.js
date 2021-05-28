import React from "react";
import { Link } from "react-router-dom";

import "./Header.scss";

export default function Header() {
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
            <li className='nav-item'>
              <Link className='nav-link text-white' to='#'>
                Login
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link text-white' to='#'>
                <i className='fas fa-shopping-cart'></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
