import React from 'react';
import PropTypes from 'prop-types';
import DeviceCard from './DeviceCard';
import '../styles/RoomSection.css';

const RoomSection = ({ room, devices, onToggle }) => {
  // Filter devices that belong to this room
  const roomDevices = (room.deviceIds || [])
    .map(deviceId => devices[deviceId])
    .filter(Boolean); // Remove any undefined devices

    if (!roomDevices || roomDevices.length === 0) {
      return <div>No devices in this room</div>;
  }


  return (
    <div className="room-section">
      <div className="room-header">
        <h2 className="room-name">{room.name}</h2>
        <span className="device-count">
          {roomDevices.length} {roomDevices.length === 1 ? 'device' : 'devices'}
        </span>
      </div>
      <div className="room-devices">
        {roomDevices.map(device => (
          <DeviceCard
            key={device.id}
            device={device}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  );
};

RoomSection.propTypes = {
  room: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    deviceIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  devices: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string,
    type: PropTypes.oneOf(['light', 'thermostat', 'camera', 'doorLock', 'blind']).isRequired,
    state: PropTypes.oneOf(['on', 'off', 'locked', 'unlocked', 'stopped', 'moving']),
    isRecording: PropTypes.bool,
    batteryLevel: PropTypes.number,
    position: PropTypes.number,
    temperature: PropTypes.number,
  })).isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default RoomSection;