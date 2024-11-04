import React, { useState } from "react";
import "../styles/Recent.css";

const ACTIVITY_TYPES = {
  LIGHT: {
    icon: "💡",
    color: "#FFA500",
  },
  LOCK: {
    icon: "🔒",
    color: "#4CAF50",
  },
  FAN: {
    icon: "💨",
    color: "#2196F3",
  },
  THERMOSTAT: {
    icon: "🌡️",
    color: "#FF5722",
  },
  DOOR: {
    icon: "🚪",
    color: "#9C27B0",
  },
};

const INITIAL_ACTIVITIES = [
  {
    id: 1,
    type: "LIGHT",
    device: "Living Room Light",
    action: "turned on",
    timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
    status: "success",
  },
  {
    id: 2,
    type: "LOCK",
    device: "Front Door",
    action: "locked",
    timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
    status: "success",
  },
  {
    id: 3,
    type: "THERMOSTAT",
    device: "Living Room Thermostat",
    action: "temperature set to 72°F",
    timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
    status: "success",
  },
];

const RecentActivities = () => {
  const [activities, setActivities] = useState(INITIAL_ACTIVITIES);
  const [showAll, setShowAll] = useState(false);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMinutes = Math.floor((now - date) / 60000);

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const addNewActivity = (type, device, action) => {
    const newActivity = {
      id: Date.now(),
      type,
      device,
      action,
      timestamp: new Date().toISOString(),
      status: "success",
    };
    setActivities([newActivity, ...activities]);
  };

  const displayedActivities = showAll ? activities : activities.slice(0, 5);

  return (
    <div className="activities-container">
      {/* Test buttons */}
      <div className="test-buttons">
        <button
          onClick={() => addNewActivity("LIGHT", "Kitchen Light", "turned on")}
          className="test-button light-button"
        >
          Test Light Action
        </button>
        <button
          onClick={() => addNewActivity("LOCK", "Front Door", "locked")}
          className="test-button lock-button"
        >
          Test Lock Action
        </button>
      </div>

      <div className="activities-card">
        <div className="activities-header">
          <h3 className="activities-title">Recent Activities</h3>
          <span className="live-badge">⚪ Live</span>
        </div>

        <div className="activities-content">
          {displayedActivities.map((activity) => (
            <div key={activity.id} className="activity-item">
              <div
                className="activity-icon"
                style={{
                  backgroundColor: `${ACTIVITY_TYPES[activity.type].color}20`,
                }}
              >
                <span>{ACTIVITY_TYPES[activity.type].icon}</span>
              </div>
              <div className="activity-details">
                <p className="activity-device">{activity.device}</p>
                <p className="activity-action">{activity.action}</p>
              </div>
              <div className="activity-time">
                {formatTimestamp(activity.timestamp)}
              </div>
            </div>
          ))}

          {activities.length > 5 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="show-more-button"
            >
              {showAll ? "Show Less ↑" : "Show More ↓"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentActivities;
