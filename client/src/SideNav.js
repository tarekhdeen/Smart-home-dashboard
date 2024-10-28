import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const SideNav = ({ isAuthenticated }) => {
  const location = useLocation();

  return (
    <nav className="side-nav">
      <div className="nav-logo">
        <h2>Smart Home</h2>
      </div>
      <ul className="nav-links">
        {!isAuthenticated ? (
          <>
            <li className={location.pathname === '/login' ? 'active' : ''}>
              <Link to="/login">Login</Link>
            </li>
            <li className={location.pathname === '/register' ? 'active' : ''}>
              <Link to="/register">Register</Link>
            </li>
          </>
        ) : (
          <li className={location.pathname === '/dashboard' ? 'active' : ''}>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

SideNav.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
};

export default SideNav;