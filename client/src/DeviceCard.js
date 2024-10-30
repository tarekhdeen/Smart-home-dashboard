import React from 'react';
import PropTypes from 'prop-types';

const DeviceCard = ({ device, onToggle }) => {
  // Helper function to get icon based on device type
  const getDeviceIcon = (type) => {
    switch(type) {
      case 'light':
        return '💡';
      case 'thermostat':
        return '🌡️';
        case 'camera':
          return '📷';
        case 'doorLock':
          return '🔒';
        case 'blind':
          return '🪟';
      default:
        return '📱';
    }
  };

  return (
    <div className="device-card">
      <div className="device-header">
        <span className="device-icon">{getDeviceIcon(device.type)}</span>
        <h3 className="device-name">{device.name || device.id}</h3>
      </div>
      
      <div className="device-content">
        {device.type === 'light' && (
          <button 
            className={`toggle-button ${device.state === 'on' ? 'on' : 'off'}`}
            onClick={() => onToggle(device.id)}
          >
            {device.state === 'on' ? 'Turn Off' : 'Turn On'}
          </button>
        )}
        
        {device.type === 'thermostat' && (
          <div className="temperature-display">
            <span className="temperature-value">{device.temperature}°F</span>
          </div>
        )}

        {device.type === 'camera' && (
          <button className={`camera-button ${device.isRecording ? 'stop-recording' : 'start-recording'}`}
          onClick={() => onToggle(device.id)}>
            {device.isRecording ? 'Stop Recording' : 'Start Recording'}
          </button>
        )}
        {device.type === 'doorLock' && (
          <button className={`lock-button ${device.state === 'locked' ? 'locked' : 'unlocked'}`} 
          onClick={() => onToggle(device.id)}>
            {device.state === 'locked' ? 'Unlocked' : 'Locked'}
          </button>
        )}
        {device.type === 'blind' && (
          <button className={`blind-button ${device.position === 100 ? 'closed' : 'open'}`}
          onClick={() => onToggle(device.id)}>
            {device.position === 100 ? 'Open Blinds' : 'Close Blinds'}
          </button>
        )}
      </div>
    </div>
  );
};

DeviceCard.propTypes = {
  device: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string,
    type: PropTypes.oneOf(['light', 'thermostat', 'camera', 'doorLock', 'blind']).isRequired,
    state: PropTypes.oneOf(['on', 'off', 'locked', 'unlocked', 'stopped', 'moving']),
    isRecording: PropTypes.bool,
    batteryLevel: PropTypes.number,
    position: PropTypes.number,
    temperature: PropTypes.number,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default DeviceCard;