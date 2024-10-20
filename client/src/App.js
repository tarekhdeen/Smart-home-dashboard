import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import DeviceCard from './DeviceCard';
import './styles.css';

function App() {
  const [devices, setDevices] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDevices();
    setupWebSocket();
  }, []);

  const fetchDevices = () => {
    axios.get('http://localhost:3000/api/devices')
      .then(response => {
        console.log('Initial devices:', response.data);
        const devicesObj = response.data.reduce((acc, device) => {
          acc[device.id] = device;
          return acc;
        }, {});
        setDevices(devicesObj);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching devices:", err);
        setError("Failed to fetch devices");
        setLoading(false);
      });
  };

  const setupWebSocket = () => {
    const socket = io('http://localhost:3000');
    
    socket.on('connect', () => console.log('Socket connected'));
    socket.on('connect_error', (err) => console.log('Socket connection error:', err));
    
    socket.on('deviceUpdate', (updatedDevice) => {
      console.log('Device update received:', updatedDevice);
      setDevices(prevDevices => ({
        ...prevDevices,
        [updatedDevice.id]: updatedDevice
      }));
    });

    return () => socket.disconnect();
  };

  const toggleDevice = (id) => {
    console.log('Toggling device:', id);
    axios.post(`http://localhost:3000/api/devices/${id}/toggle`)
      .then(response => {
        console.log('Toggle response:', response.data);
        setDevices(prevDevices => ({
          ...prevDevices,
          [id]: response.data
        }));
      })
      .catch(err => console.error("Error toggling device:", err));
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="App">
      <h1>Smart Home Dashboard</h1>
      <div className="device-grid">
        {Object.values(devices).map(device => (
          <DeviceCard
            key={device.id}
            device={device}
            onToggle={toggleDevice}
          />
        ))}
      </div>
    </div>
  );
}

export default App;