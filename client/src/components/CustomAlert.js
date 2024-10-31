import React from 'react';
import PropTypes from 'prop-types';
import '../styles/CustomAlert.css';

const CustomAlert = ({ title, message, onClose }) => {
    return (
      <div className="custom-alert" data-testid="custom-alert">
        <div className="alert-content">
          <div className="alert-text">
            <h3 className="alert-title">{title}</h3>
            <p className="alert-message">{message}</p>
          </div>
          <button 
            className="alert-close"
            onClick={onClose}
            aria-label="Close alert"
          >
            ×
          </button>
        </div>
      </div>
    );
  };
  
  CustomAlert.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
  };
  
  export default CustomAlert;