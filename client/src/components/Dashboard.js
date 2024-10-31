import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Bell, BellOff } from 'lucide-react'; 
import RoomSection from './RoomSection';
import rooms from '../data/rooms';
import TimeDisplay from './TimeDisplay';
import CustomAlert from './CustomAlert';
import useDeviceNotifications from './useDeviceNotifications';
import '../styles/Dashboard.css';

const Dashboard = ({ loading, error, devices, onToggle }) => {
  
  const { notificationsEnabled, requestNotificationPermission } = useDeviceNotifications(devices);
  const [alert, setAlert] = useState(null);

  const handleNotificationToggle = async () => {
    if (!notificationsEnabled) {
      const isGranted = await requestNotificationPermission();
      setAlert({
        title: `Notifications ${isGranted ? 'Enabled' : 'Disabled'}`,
        message: isGranted 
          ? "You'll receive alerts for device status changes and unusual activity"
          : "Please enable notifications in your browser to receive alerts"
      });
      setTimeout(() => setAlert(null), 3000);
    }
  };

  const roomRefs = useRef({});

  useEffect(() => {
    // Function to scroll to room based on hash
    const scrollToRoom = () => {
      const hash = window.location.hash;
      if (hash) {
        const roomId = hash.replace('#room-', '');
        const roomElement = roomRefs.current[roomId];
        if (roomElement) {
          roomElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // Scroll to room on initial load and hash change
    scrollToRoom();
    window.addEventListener('hashchange', scrollToRoom);

    return () => {
      window.removeEventListener('hashchange', scrollToRoom);
    };
  }, []);
  
  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  const currentTime = new Date().getHours();
  const greeting = currentTime < 12 ? 'Good Morning' : currentTime < 18 ? 'Good Afternoon' : 'Good Evening';

  return (
    <div className="dashboard">
      <div className="dashboard-header">
      <h1 className="dashboard-title">
        {greeting}, {localStorage.getItem('username')}
      </h1>
      <button
          onClick={handleNotificationToggle}
          className="notification-button"
        >
          {notificationsEnabled ? <Bell /> : <BellOff />}
          <span>{notificationsEnabled ? 'Notifications On' : 'Enable Notifications'}</span>
        </button>
      </div>
        {alert && (
        <CustomAlert
          title={alert.title}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      <TimeDisplay />
      <div className="device-grid">
        {Object.values(rooms).map(room => (
          <div 
            key={room.id} 
            id={`room-${room.id}`}
            ref={el => roomRefs.current[room.id] = el}
          >
            <RoomSection
              room={room}
              devices={devices}
              onToggle={onToggle}
            />
          </div>
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