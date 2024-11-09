import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Clock,
  Plus,
  Calendar,
  Edit2,
  Trash2,
  Power,
  Save,
  X,
} from "lucide-react";
import "../styles/Scheduled.css";

const DeviceScheduling = () => {
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      deviceName: "Living Room Lights",
      action: "turn_on",
      time: "07:00",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      active: true,
    },
    {
      id: 2,
      deviceName: "Air Conditioner",
      action: "turn_off",
      time: "22:00",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      active: true,
    },
  ]);

  const [isAddingSchedule, setIsAddingSchedule] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);

  const [newSchedule, setNewSchedule] = useState({
    deviceName: "",
    action: "turn_on",
    time: "",
    days: [],
    active: true,
  });

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const devices = [
    "Living Room Lights",
    "Bedroom Lights",
    "Air Conditioner",
    "Smart TV",
    "Coffee Maker",
  ];

  const handleAddSchedule = () => {
    if (
      newSchedule.deviceName &&
      newSchedule.time &&
      newSchedule.days.length > 0
    ) {
      setSchedules([
        ...schedules,
        {
          ...newSchedule,
          id: Date.now(),
        },
      ]);
      setNewSchedule({
        deviceName: "",
        action: "turn_on",
        time: "",
        days: [],
        active: true,
      });
      setIsAddingSchedule(false);
    }
  };

  const handleDeleteSchedule = (id) => {
    setSchedules(schedules.filter((schedule) => schedule.id !== id));
  };

  const handleToggleSchedule = (id) => {
    setSchedules(
      schedules.map((schedule) =>
        schedule.id === id
          ? { ...schedule, active: !schedule.active }
          : schedule
      )
    );
  };

  const handleEditSchedule = (schedule) => {
    setEditingSchedule(schedule);
    setNewSchedule(schedule);
  };

  const handleUpdateSchedule = () => {
    setSchedules(
      schedules.map((schedule) =>
        schedule.id === editingSchedule.id ? newSchedule : schedule
      )
    );
    setEditingSchedule(null);
    setNewSchedule({
      deviceName: "",
      action: "turn_on",
      time: "",
      days: [],
      active: true,
    });
  };

  const toggleDay = (day) => {
    setNewSchedule((prev) => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day],
    }));
  };

  const ScheduleForm = ({ onSubmit, onCancel }) => (
    <div className="schedule-form">
      <div className="form-group">
        <label>Device</label>
        <select
          value={newSchedule.deviceName}
          onChange={(e) =>
            setNewSchedule({ ...newSchedule, deviceName: e.target.value })
          }
        >
          <option value="">Select Device</option>
          {devices.map((device) => (
            <option key={device} value={device}>
              {device}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Action</label>
        <select
          value={newSchedule.action}
          onChange={(e) =>
            setNewSchedule({ ...newSchedule, action: e.target.value })
          }
        >
          <option value="turn_on">Turn On</option>
          <option value="turn_off">Turn Off</option>
        </select>
      </div>

      <div className="form-group">
        <label>Time</label>
        <input
          type="time"
          value={newSchedule.time}
          onChange={(e) =>
            setNewSchedule({ ...newSchedule, time: e.target.value })
          }
        />
      </div>

      <div className="form-group">
        <label>Repeat</label>
        <div className="days-selector">
          {daysOfWeek.map((day) => (
            <button
              key={day}
              className={`day-button ${newSchedule.days.includes(day) ? "selected" : ""}`}
              onClick={() => toggleDay(day)}
              type="button"
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <div className="form-actions">
        <button className="button button-outline" onClick={onCancel}>
          <X className="icon-small" />
          Cancel
        </button>
        <button className="button button-blue" onClick={onSubmit}>
          <Save className="icon-small" />
          {editingSchedule ? "Update" : "Save"} Schedule
        </button>
      </div>
    </div>
  );

  ScheduleForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  return (
    <div className="container">
      <div className="schedules-container">
        <div className="schedules-header">
          <div className="header-title">
            <Calendar className="header-icon" />
            <h1 className="main-title">Device Schedules</h1>
          </div>
          {!isAddingSchedule && !editingSchedule && (
            <button
              className="button button-blue"
              onClick={() => setIsAddingSchedule(true)}
            >
              <Plus className="icon-small" />
              Add Schedule
            </button>
          )}
        </div>

        {(isAddingSchedule || editingSchedule) && (
          <div className="schedule-form-container">
            <h2 className="form-title">
              {editingSchedule ? "Edit Schedule" : "New Schedule"}
            </h2>
            <ScheduleForm
              onSubmit={
                editingSchedule ? handleUpdateSchedule : handleAddSchedule
              }
              onCancel={() => {
                setIsAddingSchedule(false);
                setEditingSchedule(null);
                setNewSchedule({
                  deviceName: "",
                  action: "turn_on",
                  time: "",
                  days: [],
                  active: true,
                });
              }}
            />
          </div>
        )}

        <div className="schedules-list">
          {schedules.map((schedule) => (
            <div
              key={schedule.id}
              className={`schedule-card ${!schedule.active ? "inactive" : ""}`}
            >
              <div className="schedule-info">
                <div className="schedule-header">
                  <h3 className="schedule-device">{schedule.deviceName}</h3>
                  <div className="schedule-actions">
                    <button
                      className={`button-icon ${schedule.active ? "button-blue" : "button-outline"}`}
                      onClick={() => handleToggleSchedule(schedule.id)}
                      title={schedule.active ? "Disable" : "Enable"}
                    >
                      <Power className="icon-small" />
                    </button>
                    <button
                      className="button-icon button-outline"
                      onClick={() => handleEditSchedule(schedule)}
                      title="Edit"
                    >
                      <Edit2 className="icon-small" />
                    </button>
                    <button
                      className="button-icon button-red"
                      onClick={() => handleDeleteSchedule(schedule.id)}
                      title="Delete"
                    >
                      <Trash2 className="icon-small" />
                    </button>
                  </div>
                </div>
                <div className="schedule-details">
                  <div className="schedule-time">
                    <Clock className="icon-small" />
                    {schedule.time}
                  </div>
                  <div className="schedule-action">
                    {schedule.action === "turn_on" ? "Turn On" : "Turn Off"}
                  </div>
                </div>
                <div className="schedule-days">
                  {daysOfWeek.map((day) => (
                    <span
                      key={day}
                      className={`day-indicator ${schedule.days.includes(day) ? "active" : ""}`}
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeviceScheduling;
