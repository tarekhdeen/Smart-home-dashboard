import React, { useState, useRef } from "react";
import {
  Camera,
  Video,
  Play,
  Square,
  Trash2,
  List,
  Download,
  Edit2,
  Pause,
  SkipBack,
  SkipForward,
} from "lucide-react";
import "../styles/CamerasRecording.css";

const CameraRecords = () => {
  const [isRecording1, setIsRecording1] = useState(false);
  const [isRecording2, setIsRecording2] = useState(false);
  const [recordings, setRecordings] = useState([
    {
      id: 1,
      name: "Front Door Camera - Recording 1",
      date: "2024-11-03 10:30:00",
      camera: 1,
    },
    {
      id: 2,
      name: "Backyard Camera - Recording 1",
      date: "2024-11-03 11:15:00",
      camera: 2,
    },
  ]);
  const [selectedRecording, setSelectedRecording] = useState(null);
  const [showRecordingsList, setShowRecordingsList] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const editInputRef = useRef(null);

  const toggleRecording = (cameraId) => {
    if (cameraId === 1) {
      setIsRecording1(!isRecording1);
    } else {
      setIsRecording2(!isRecording2);
    }
  };

  const deleteRecording = (id) => {
    setRecordings(recordings.filter((rec) => rec.id !== id));
    if (selectedRecording?.id === id) {
      setSelectedRecording(null);
    }
  };

  const playRecording = (recording) => {
    setSelectedRecording(recording);
    setShowRecordingsList(false);
    setIsPlaying(true);
    setCurrentTime(0);
  };

  const handleDownload = (recording) => {
    // In a real application, this would handle actual video file download
    const link = document.createElement("a");
    link.href = "#"; // Would be actual video URL
    link.download = `${recording.name}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const startEditing = (id) => {
    setEditingId(id);
    setTimeout(() => {
      if (editInputRef.current) {
        editInputRef.current.focus();
      }
    }, 0);
  };

  const handleRename = (id, newName) => {
    setRecordings(
      recordings.map((rec) => (rec.id === id ? { ...rec, name: newName } : rec))
    );
    setEditingId(null);
    if (selectedRecording?.id === id) {
      setSelectedRecording({ ...selectedRecording, name: newName });
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="container">
      <h1 className="main-title">Camera Records</h1>

      <div className="camera-grid">
        {/* Camera sections remain the same */}
        {/* Front Door Camera */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">
              <Camera className="icon" />
              Front Door Camera
            </h2>
          </div>
          <div className="card-content">
            <div className="camera-preview">
              <Video className="preview-icon" />
            </div>
            <div className="RButton-group">
              <button
                onClick={() => toggleRecording(1)}
                className={`RButton ${isRecording1 ? "RButton-red" : "RButton-blue"}`}
              >
                {isRecording1 ? (
                  <>
                    <Square className="icon-small" /> Stop Recording
                  </>
                ) : (
                  <>
                    <Video className="icon-small" /> Start Recording
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Backyard Camera */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">
              <Camera className="icon" />
              Backyard Camera
            </h2>
          </div>
          <div className="card-content">
            <div className="camera-preview">
              <Video className="preview-icon" />
            </div>
            <div className="RButton-group">
              <button
                onClick={() => toggleRecording(2)}
                className={`RButton ${isRecording2 ? "RButton-red" : "RButton-blue"}`}
              >
                {isRecording2 ? (
                  <>
                    <Square className="icon-small" /> Stop Recording
                  </>
                ) : (
                  <>
                    <Video className="icon-small" /> Start Recording
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Controls</h2>
        </div>
        <div className="card-content">
          <button
            className="RButton RButton-outline"
            onClick={() => setShowRecordingsList(!showRecordingsList)}
          >
            <List className="icon-small" />
            Recordings List
          </button>
        </div>
      </div>

      {/* Recordings List */}
      {showRecordingsList && (
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Recordings</h2>
          </div>
          <div className="card-content">
            {recordings.length === 0 ? (
              <div className="alert">No recordings available.</div>
            ) : (
              <div className="recordings-list">
                {recordings.map((recording) => (
                  <div key={recording.id} className="recording-item">
                    <div className="recording-info">
                      {editingId === recording.id ? (
                        <input
                          ref={editInputRef}
                          type="text"
                          className="rename-input"
                          defaultValue={recording.name}
                          onBlur={(e) =>
                            handleRename(recording.id, e.target.value)
                          }
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              handleRename(recording.id, e.target.value);
                            }
                          }}
                        />
                      ) : (
                        <p className="recording-name">{recording.name}</p>
                      )}
                      <p className="recording-date">
                        {recording.date} - Duration: {recording.duration}
                      </p>
                    </div>
                    <div className="recording-actions">
                      <button
                        className="RButton RButton-icon"
                        onClick={() => playRecording(recording)}
                        title="Play"
                      >
                        <Play className="icon-small" />
                      </button>
                      <button
                        className="RButton RButton-icon"
                        onClick={() => startEditing(recording.id)}
                        title="Rename"
                      >
                        <Edit2 className="icon-small" />
                      </button>
                      <button
                        className="RButton RButton-icon"
                        onClick={() => handleDownload(recording)}
                        title="Download"
                      >
                        <Download className="icon-small" />
                      </button>
                      <button
                        className="RButton RButton-icon RButton-red"
                        onClick={() => deleteRecording(recording.id)}
                        title="Delete"
                      >
                        <Trash2 className="icon-small" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Selected Recording Playback */}
      {selectedRecording && (
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Playing: {selectedRecording.name}</h2>
          </div>
          <div className="card-content">
            <div className="playback-preview">
              <Play className="preview-icon" />
            </div>
            <div className="playback-controls">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${(currentTime / 100) * 100}%` }}
                ></div>
              </div>
              <div className="time-display">
                {formatTime(currentTime)} / {selectedRecording.duration}
              </div>
              <div className="playback-RButtons">
                <button className="RButton RButton-icon" title="Previous 10s">
                  <SkipBack className="icon-small" />
                </button>
                <button
                  className="RButton RButton-icon"
                  onClick={() => setIsPlaying(!isPlaying)}
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause className="icon-small" />
                  ) : (
                    <Play className="icon-small" />
                  )}
                </button>
                <button className="RButton RButton-icon" title="Next 10s">
                  <SkipForward className="icon-small" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraRecords;
