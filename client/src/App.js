import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SideNav from "./components/SideNav";
import Dashboard from "./components/Dashboard";
import Recent from "./pages/Recent";
import CamerasRecords from "./pages/CamerasRecords";
import Scheduled from "./pages/Scheduled";
import "./styles/AppStyles.css";

function App() {
  const [devices, setDevices] = useState({});
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchDevices();
      fetchActivities();
      const cleanup = setupWebSocket();
      return cleanup;
    }
  }, [isAuthenticated]);

  const fetchDevices = () => {
    axios
      .get("http://localhost:3000/api/devices")
      .then((response) => {
        console.log("Initial devices:", response.data);
        const devicesObj = response.data.reduce((acc, device) => {
          acc[device.id] = device;
          return acc;
        }, {});
        setDevices(devicesObj);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching devices:", err);
        setError("Failed to fetch devices");
        setLoading(false);
      });
  };

  const fetchActivities = () => {
    axios
      .get("http://localhost:3000/api/activities")
      .then((response) => {
        console.log("Initial activities:", response.data);
        setActivities(response.data);
      })
      .catch((err) => console.error("Error fetching activities:", err));
  };

  const setupWebSocket = () => {
    const socket = io("http://localhost:3000");

    socket.on("connect", () => console.log("Socket connected"));
    socket.on("connect_error", (err) =>
      console.log("Socket connection error:", err)
    );

    socket.on("deviceUpdate", (updatedDevice) => {
      console.log("Device update received:", updatedDevice);
      setDevices((prevDevices) => ({
        ...prevDevices,
        [updatedDevice.id]: updatedDevice,
      }));
    });

    return () => socket.disconnect();
  };

  const toggleDevice = (id) => {
    console.log("Toggling device:", id);
    axios
      .post(`http://localhost:3000/api/devices/${id}/toggle`)
      .then((response) => {
        console.log("Toggle response:", response.data);
        setDevices((prevDevices) => ({
          ...prevDevices,
          [id]: response.data,
        }));
      })
      .catch((err) => console.error("Error toggling device:", err));
  };

  return (
    <div className="app-container">
      <SideNav
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <div className="main-content">
        <Routes>
          <Route
            path="/register"
            element={<Register onRegister={() => setIsAuthenticated(true)} />}
          />
          <Route
            path="/login"
            element={<Login onLogin={() => setIsAuthenticated(true)} />}
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard
                  loading={loading}
                  error={error}
                  devices={devices}
                  onToggle={toggleDevice}
                  setIsAuthenticated={setIsAuthenticated}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/Recent" element={<Recent activities={activities} />} />
          <Route
            path="/CamerasRecords"
            element={<CamerasRecords CamerasRecords />}
          />
          <Route path="/scheduled" element={<Scheduled />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
