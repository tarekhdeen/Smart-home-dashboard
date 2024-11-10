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
  Home,
} from "lucide-react";
import rooms from "../data/rooms";
import devices from "../data/devices";
import "../styles/Scheduled.css";

// const devices = {
//   doorLock1: { id: "doorLock1", name: "Front Door Lock", type: "lock" },
//   doorLock2: { id: "doorLock2", name: "Garage Door Lock", type: "lock" },
//   camera1: { id: "camera1", name: "Front Door Camera", type: "camera" },
//   camera2: { id: "camera2", name: "Garage Camera", type: "camera" },
//   light1: { id: "light1", name: "Living Room Light", type: "light" },
//   light2: { id: "light2", name: "Kitchen Light", type: "light" },
//   light3: { id: "light3", name: "Bedroom Light", type: "light" },
//   light4: { id: "light4", name: "Bathroom Light", type: "light" },
//   thermostat1: {
//     id: "thermostat1",
//     name: "Living Room Thermostat",
//     type: "climate",
//   },
//   thermostat2: {
//     id: "thermostat2",
//     name: "Bedroom Thermostat",
//     type: "climate",
//   },
//   blind1: { id: "blind1", name: "Living Room Blinds", type: "blind" },
//   blind2: { id: "blind2", name: "Bedroom Blinds", type: "blind" },
// };

const DeviceScheduling = () => {
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      roomId: "living_room",
      deviceId: "light1",
      action: "turn_on",
      time: "07:00",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      active: true,
    },
  ]);

  const [isAddingSchedule, setIsAddingSchedule] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState("");

  const [newSchedule, setNewSchedule] = useState({
    roomId: "",
    deviceId: "",
    action: "turn_on",
    time: "",
    days: [],
    active: true,
  });

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const getDeviceName = (roomId, deviceId) => {
    return devices[deviceId]?.name || "";
  };

  const getRoomName = (roomId) => {
    return rooms[roomId]?.name || "";
  };

  const getAvailableDevices = (roomId) => {
    if (!roomId) return [];
    const deviceIds = rooms[roomId]?.deviceIds || [];
    return deviceIds.map((id) => devices[id]);
  };

  const getDeviceActions = (deviceType) => {
    const actionsByType = {
      light: ["turn_on", "turn_off"],
      doorLock: ["lock", "unlock"],
      blind: ["Open_Blinds", "Close_Blinds"],
      camera: ["start_recording", "stop_recording"],
    };
    return actionsByType[deviceType] || ["turn_on", "turn_off"];
  };

  const handleAddSchedule = () => {
    if (
      newSchedule.roomId &&
      newSchedule.deviceId &&
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
        roomId: "",
        deviceId: "",
        action: "turn_on",
        time: "",
        days: [],
        active: true,
      });
      setIsAddingSchedule(false);
      setSelectedRoom("");
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
    setSelectedRoom(schedule.roomId);
  };

  const handleUpdateSchedule = () => {
    setSchedules(
      schedules.map((schedule) =>
        schedule.id === editingSchedule.id ? newSchedule : schedule
      )
    );
    setEditingSchedule(null);
    setNewSchedule({
      roomId: "",
      deviceId: "",
      action: "turn_on",
      time: "",
      days: [],
      active: true,
    });
    setSelectedRoom("");
  };

  const toggleDay = (day) => {
    setNewSchedule((prev) => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day],
    }));
  };

  const ScheduleForm = ({ onSubmit, onCancel }) => {
    const availableDevices = getAvailableDevices(selectedRoom);
    const deviceType = devices[newSchedule.deviceId]?.type;
    const availableActions = deviceType ? getDeviceActions(deviceType) : [];

    ScheduleForm.propTypes = {
      onSubmit: PropTypes.func.isRequired,
      onCancel: PropTypes.func.isRequired,
    };

    return (
      <div className="schedule-form">
        <div className="form-group">
          <label>Room</label>
          <select
            value={newSchedule.roomId}
            onChange={(e) => {
              const roomId = e.target.value;
              setSelectedRoom(roomId);
              setNewSchedule({
                ...newSchedule,
                roomId: roomId,
                deviceId: "",
              });
            }}
          >
            <option value="">Select Room</option>
            {Object.values(rooms).map((room) => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Device</label>
          <select
            value={newSchedule.deviceId}
            onChange={(e) =>
              setNewSchedule({
                ...newSchedule,
                deviceId: e.target.value,
                action: "", // Reset action when device changes
              })
            }
            disabled={!selectedRoom}
          >
            <option value="">Select Device</option>
            {availableDevices.map((device) => (
              <option key={device.id} value={device.id}>
                {device.name}
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
            disabled={!newSchedule.deviceId}
          >
            <option value="">Select Action</option>
            {availableActions.map((action) => (
              <option key={action} value={action}>
                {action.replace("_", " ").charAt(0).toUpperCase() +
                  action.slice(1).replace("_", " ")}
              </option>
            ))}
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
                className={`day-SCbutton ${newSchedule.days.includes(day) ? "selected" : ""}`}
                onClick={() => toggleDay(day)}
                type="button"
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button className="SCbutton SCbutton-outline" onClick={onCancel}>
            <X className="SCicon-small" />
            Cancel
          </button>
          <button
            className="SCbutton SCbutton-blue"
            onClick={onSubmit}
            disabled={
              !newSchedule.roomId ||
              !newSchedule.deviceId ||
              !newSchedule.action ||
              !newSchedule.time ||
              newSchedule.days.length === 0
            }
          >
            <Save className="SCicon-small" />
            {editingSchedule ? "Update" : "Save"} Schedule
          </button>
        </div>
      </div>
    );
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
              className="SCbutton SCbutton-blue"
              onClick={() => setIsAddingSchedule(true)}
            >
              <Plus className="SCicon-small" />
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
                  roomId: "",
                  deviceId: "",
                  action: "turn_on",
                  time: "",
                  days: [],
                  active: true,
                });
                setSelectedRoom("");
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
                  <div>
                    <div className="schedule-room">
                      <Home className="SCicon-small" />
                      {getRoomName(schedule.roomId)}
                    </div>
                    <h3 className="schedule-device">
                      {getDeviceName(schedule.roomId, schedule.deviceId)}
                    </h3>
                  </div>
                  <div className="schedule-actions">
                    <button
                      className={`SCbutton-icon ${schedule.active ? "SCbutton-blue" : "SCbutton-outline"}`}
                      onClick={() => handleToggleSchedule(schedule.id)}
                      title={schedule.active ? "Disable" : "Enable"}
                    >
                      <Power className="SCicon-small" />
                    </button>
                    <button
                      className="SCbutton-icon SCbutton-outline"
                      onClick={() => handleEditSchedule(schedule)}
                      title="Edit"
                    >
                      <Edit2 className="SCicon-small" />
                    </button>
                    <button
                      className="SCbutton-icon button-red"
                      onClick={() => handleDeleteSchedule(schedule.id)}
                      title="Delete"
                    >
                      <Trash2 className="SCicon-small" />
                    </button>
                  </div>
                </div>
                <div className="schedule-details">
                  <div className="schedule-time">
                    <Clock className="SCicon-small" />
                    {schedule.time}
                  </div>
                  <div className="schedule-action">
                    {schedule.action.replace("_", " ").charAt(0).toUpperCase() +
                      schedule.action.slice(1).replace("_", " ")}
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
