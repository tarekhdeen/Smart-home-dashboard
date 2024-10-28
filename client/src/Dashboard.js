import React from 'react';
import PropTypes from 'prop-types';
import RoomSection from './RoomSection';
import rooms from './data/rooms';

const Dashboard = ({ loading, error, devices, onToggle }) => {
  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="dashboard">
      <h1>Smart Home Dashboard</h1>
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
};

export default Dashboard;