import React, { useState } from 'react'; 
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import rooms from './data/rooms';
import './styles/SideNav.css';

const SideNav = ({ isAuthenticated, setIsAuthenticated }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isNavOpen, setNavOpen] = useState(false);

  // Toggle function to open/close nav
  const toggleNav = () => setNavOpen(!isNavOpen);

  // Sign-out function
  const signOut = () => {
    localStorage.removeItem('authtoken');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <div>
      {/* Toggle Button (visible only on mobile) */}
      <button
        className="nav-toggle-btn"
        onClick={toggleNav}
      >
        {isNavOpen ? 'Close' : 'Menu'}
      </button>

      {/* Side Navigation */}
      <nav className={`side-nav ${isNavOpen ? 'open' : ''}`}>
        <div className="nav-logo">
          <h2>Smart Home</h2>
        </div>
        <ul className="nav-links">
          {!isAuthenticated ? (
            <>
              <li className={location.pathname === '/login' ? 'active' : ''}>
                <Link to="/login" onClick={() => setNavOpen(false)}>Login</Link>
              </li>
              <li className={location.pathname === '/register' ? 'active' : ''}>
                <Link to="/register" onClick={() => setNavOpen(false)}>Register</Link>
              </li>
            </>
          ) : (
            <>
              <li className={location.pathname === '/dashboard' ? 'active' : ''}>
                <Link to="/dashboard" onClick={() => setNavOpen(false)}>Dashboard</Link>
              </li>
              <ul className="room-links">
            {Object.keys(rooms).map(roomId => (
              <li key={roomId}>
                <Link to={`/dashboard/${roomId}`}>{rooms[roomId].name}</Link>
              </li>
            ))}
              </ul>
              <li>
                <button onClick={signOut} className="sign-out-button">
                  Sign Out
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

SideNav.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default SideNav;