import React from 'react';
import PropTypes from 'prop-types';
import RoomSection from './RoomSection';
import rooms from './data/rooms';
import TimeDisplay from './components/TimeDisplay';

const Dashboard = ({ loading, error, devices, onToggle}) => {
  
  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  const currentTime = new Date().getHours();
  const greeting = currentTime < 12 ? 'Good Morning' : currentTime < 18 ? 'Good Afternoon' : 'Good Evening';

  return (
    <div className="dashboard">
      <h1>{greeting}, {localStorage.getItem('username')} </h1>
      <TimeDisplay />
      <div className="device-grid">
        {Object.values(rooms).map(room => (
          <RoomSection
            key={room.id}
            room={room}
            devices={devices}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  );
};

Dashboard.propTypes = {
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    devices: PropTypes.object.isRequired,
    onToggle: PropTypes.func.isRequired,
    setIsAuthenticated: PropTypes.func.isRequired,
};

export default Dashboard;