import React, { useState, useEffect } from 'react';
import '../styles/TimeDisplay.css';

function TimeDisplay() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="time-display">
      <h2>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</h2>
      <p>{currentTime.toLocaleDateString()}</p>
    </div>
  );
}

export default TimeDisplay;