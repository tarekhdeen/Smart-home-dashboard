import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import { Clock } from "lucide-react";
import "../styles/Recent.css";

const RecentActivity = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchActivities();
    setupWebSocket();
  }, []);

  const fetchActivities = () => {
    axios
      .get("http://localhost:3000/api/activities")
      .then((response) => {
        console.log("Activities:", response.data);
        setActivities(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching activities:", err);
        setError("Failed to fetch activities");
        setLoading(false);
      });
  };

  const setupWebSocket = () => {
    const socket = io("http://localhost:3000");

    socket.on("connect", () => console.log("Socket connected"));
    socket.on("connect_error", (err) =>
      console.log("Socket connection error:", err)
    );

    socket.on("deviceUpdate", (updatedDevice) => {
      console.log("Device update received:", updatedDevice);
      // Update the activities state with the new device activity
      setActivities((prevActivities) => {
        const newActivities = [...prevActivities];
        const index = newActivities.findIndex(
          (activity) => activity.device === updatedDevice.id
        );
        if (index !== -1) {
          newActivities[index] = {
            ...newActivities[index],
            action: updatedDevice.action,
            timestamp: updatedDevice.timestamp,
          };
        } else {
          newActivities.push({
            type: updatedDevice.type,
            device: updatedDevice.id,
            action: updatedDevice.action,
            timestamp: updatedDevice.timestamp,
          });
        }
        return newActivities;
      });
    });
  };

  return (
    <div className="recent-activity">
      <div className="recent-activity-header">
        <Clock className="header-icon" />
        <h1>Recent Activity</h1>
      </div>

      {loading ? (
        <div className="loading-state">
          <p>Loading...</p>
        </div>
      ) : (
        <ul className="activity-list">
          {activities.map((activity, index) => (
            <li key={activity._id || index} className="activity-item">
              <div className="activity-content">
                <span className="activity-type">{activity.type}</span>
                <span className="activity-device">{activity.device}</span>
                <span className="activity-action">{activity.action}</span>
                <span className="activity-timestamp">{activity.timestamp}</span>
              </div>
            </li>
          ))}
        </ul>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default RecentActivity;
