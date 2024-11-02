import React, { useState } from 'react'; 
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import rooms from '../data/rooms';
import '../styles/SideNav.css';
import { 
  LayoutDashboard, 
  History, 
  Timer, 
  MessageSquare,
  Settings,
  HelpCircle,
  Menu,
  LogOut,
  ChevronRight
} from 'lucide-react';

const SideNav = ({ isAuthenticated, setIsAuthenticated }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isNavOpen, setNavOpen] = useState(false);

  const mainNavItems = [
    { 
      icon: LayoutDashboard, 
      label: 'Dashboard', 
      path: '/dashboard',
      isActive: location.pathname === '/dashboard' && !location.hash
    },
    { 
      icon: History, 
      label: 'Recent', 
      path: '/recent',
      isActive: location.pathname === '/recent'
    },
    { 
      icon: Timer, 
      label: 'Scheduled', 
      path: '/scheduled',
      isActive: location.pathname === '/scheduled'
    },
    { 
      icon: MessageSquare, 
      label: 'Notifications', 
      path: '/notifications',
      isActive: location.pathname === '/notifications'
    }
  ];

  const bottomNavItems = [
    { 
      icon: Settings, 
      label: 'Settings', 
      path: '/settings',
      isActive: location.pathname === '/settings'
    },
    { 
      icon: HelpCircle, 
      label: 'Support', 
      path: '/support',
      isActive: location.pathname === '/support'
    }
  ];

  const handleRoomClick = (roomId) => {
    if (location.pathname === '/dashboard') {
      window.location.hash = `room-${roomId}`;
    } else {
      navigate(`/dashboard#room-${roomId}`);
    }
    setNavOpen(false);
  };

  const signOut = () => {
    localStorage.removeItem('authtoken');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className={`mobile-menu-button ${isNavOpen ? 'active' : ''}`}
        onClick={() => setNavOpen(!isNavOpen)}
      >
        <Menu className="menu-icon" />
      </button>

      {/* Overlay for mobile */}
      {isNavOpen && (
        <div 
          className="mobile-overlay"
          onClick={() => setNavOpen(false)}
        />
      )}

      {/* Side Navigation */}
      <nav className={`sidenav ${isNavOpen ? 'open' : ''}`}>
        {/* Logo Section */}
        <div className="logo-section">
          <div className="logo" />
          <span className="logo-text">Houseplan</span>
        </div>

        {/* Main Navigation */}
        <div className="nav-content">
          {/* Primary Nav Items */}
          <div className="primary-nav">
            {!isAuthenticated ? (
              <>
                <NavItem 
                  icon={LayoutDashboard}
                  label="Login"
                  path="/login"
                  isActive={location.pathname === '/login'}
                  onClick={() => setNavOpen(false)}
                />
                <NavItem 
                  icon={History}
                  label="Register"
                  path="/register"
                  isActive={location.pathname === '/register'}
                  onClick={() => setNavOpen(false)}
                />
              </>
            ) : (
              <>
                {mainNavItems.map((item) => (
                  <NavItem 
                    key={item.label}
                    {...item}
                    onClick={() => setNavOpen(false)}
                  />
                ))}

                {/* Rooms Section */}
                <div className="rooms-section">
                  <div className="rooms-header">Rooms</div>
                  {Object.entries(rooms).map(([roomId, room]) => (
                    <button
                      key={roomId}
                      onClick={() => handleRoomClick(roomId)}
                      className={`room-button ${location.hash === `#room-${roomId}` ? 'active' : ''}`}
                    >
                      <ChevronRight className="chevron-icon" />
                      <span>{room.name}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Bottom Navigation */}
          {isAuthenticated && (
            <div className="bottom-nav">
              {bottomNavItems.map((item) => (
                <NavItem 
                  key={item.label}
                  {...item}
                  onClick={() => setNavOpen(false)}
                />
              ))}
              
              {/* Sign Out Button */}
              <button
                onClick={signOut}
                className="sign-out-button"
              >
                <LogOut className="signout-icon" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

// NavItem Component
const NavItem = ({ icon: Icon, label, path, isActive, onClick }) => (
  <Link
    to={path}
    onClick={onClick}
    className={`nav-item ${isActive ? 'active' : ''}`}
  >
    <Icon className="nav-icon" />
    <span>{label}</span>
  </Link>
);

NavItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

SideNav.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default SideNav;