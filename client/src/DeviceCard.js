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
      </div>
    </div>
  );
};

DeviceCard.propTypes = {
  device: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string,
    type: PropTypes.oneOf(['light', 'thermostat']).isRequired,
    state: PropTypes.oneOf(['on', 'off']),
    temperature: PropTypes.number,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default DeviceCard;