import React, { useState } from "react";
import {
  Save,
  Settings as SettingsIcon,
  Moon,
  Sun,
  Bell,
  Home,
  Shield,
  Wifi,
  Languages,
  ChevronRight,
  Clock,
} from "lucide-react";
import "../styles/Settings.css";

const Settings = () => {
  const [settings, setSettings] = useState({
    darkMode: true,
    notifications: true,
    deviceSync: false,
    autoLock: true,
    timezone: "UTC-5",
    language: "English",
    wifiNetwork: "HomeNetwork",
    securityLevel: "High",
  });

  const [showSaved, setShowSaved] = useState(false);

  const handleSettingToggle = (setting) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleSettingChange = (setting, value) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: value,
    }));
  };

  const handleSave = () => {
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  const timezones = [
    "UTC-12",
    "UTC-11",
    "UTC-10",
    "UTC-9",
    "UTC-8",
    "UTC-7",
    "UTC-6",
    "UTC-5",
    "UTC-4",
    "UTC-3",
    "UTC-2",
    "UTC-1",
    "UTC+0",
    "UTC+1",
    "UTC+2",
    "UTC+3",
    "UTC+4",
    "UTC+5",
    "UTC+6",
    "UTC+7",
    "UTC+8",
    "UTC+9",
    "UTC+10",
    "UTC+11",
    "UTC+12",
  ];

  const languages = [
    "Arabic",
    "English",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Japanese",
  ];
  const securityLevels = ["Low", "Medium", "High"];

  return (
    <div className="container">
      <div className="settings-container">
        <div className="settings-header">
          <div className="header-title">
            <SettingsIcon className="header-icon" />
            <h1 className="main-title">Settings</h1>
          </div>
          <button className="button button-blue" onClick={handleSave}>
            <Save className="icon-small" />
            Save Changes
          </button>
        </div>

        {showSaved && (
          <div className="save-notification">Settings saved successfully!</div>
        )}

        <div className="settings-grid">
          <div className="settings-section">
            <h2 className="section-title">Appearance</h2>
            <div className="setting-item">
              <div className="setting-info">
                <div className="setting-icon">
                  {settings.darkMode ? (
                    <Moon className="icon-small" />
                  ) : (
                    <Sun className="icon-small" />
                  )}
                </div>
                <div className="setting-text">
                  <h3>Dark Mode</h3>
                  <p>Toggle dark mode appearance</p>
                </div>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={settings.darkMode}
                  onChange={() => handleSettingToggle("darkMode")}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>

          <div className="settings-section">
            <h2 className="section-title">Notifications</h2>
            <div className="setting-item">
              <div className="setting-info">
                <div className="setting-icon">
                  <Bell className="icon-small" />
                </div>
                <div className="setting-text">
                  <h3>Push Notifications</h3>
                  <p>Receive alerts for device events</p>
                </div>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={() => handleSettingToggle("notifications")}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>

          <div className="settings-section">
            <h2 className="section-title">Network</h2>
            <div className="setting-item">
              <div className="setting-info">
                <div className="setting-icon">
                  <Wifi className="icon-small" />
                </div>
                <div className="setting-text">
                  <h3>Wi-Fi Network</h3>
                  <p>Connected to: {settings.wifiNetwork}</p>
                </div>
              </div>
              <ChevronRight className="icon-small chevron" />
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <div className="setting-icon">
                  <Home className="icon-small" />
                </div>
                <div className="setting-text">
                  <h3>Device Sync</h3>
                  <p>Auto-sync with new devices</p>
                </div>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={settings.deviceSync}
                  onChange={() => handleSettingToggle("deviceSync")}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>

          <div className="settings-section">
            <h2 className="section-title">Security</h2>
            <div className="setting-item">
              <div className="setting-info">
                <div className="setting-icon">
                  <Shield className="icon-small" />
                </div>
                <div className="setting-text">
                  <h3>Security Level</h3>
                  <p>Set system security level</p>
                </div>
              </div>
              <select
                value={settings.securityLevel}
                onChange={(e) =>
                  handleSettingChange("securityLevel", e.target.value)
                }
                className="setting-select"
              >
                {securityLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <div className="setting-icon">
                  <Shield className="icon-small" />
                </div>
                <div className="setting-text">
                  <h3>Auto-Lock</h3>
                  <p>Automatically lock devices when inactive</p>
                </div>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={settings.autoLock}
                  onChange={() => handleSettingToggle("autoLock")}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>

          <div className="settings-section">
            <h2 className="section-title">Preferences</h2>
            <div className="setting-item">
              <div className="setting-info">
                <div className="setting-icon">
                  <Languages className="icon-small" />
                </div>
                <div className="setting-text">
                  <h3>Language</h3>
                  <p>Select your preferred language</p>
                </div>
              </div>
              <select
                value={settings.language}
                onChange={(e) =>
                  handleSettingChange("language", e.target.value)
                }
                className="setting-select"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <div className="setting-icon">
                  <Clock className="icon-small" />
                </div>
                <div className="setting-text">
                  <h3>Timezone</h3>
                  <p>Set your local timezone</p>
                </div>
              </div>
              <select
                value={settings.timezone}
                onChange={(e) =>
                  handleSettingChange("timezone", e.target.value)
                }
                className="setting-select"
              >
                {timezones.map((tz) => (
                  <option key={tz} value={tz}>
                    {tz}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
