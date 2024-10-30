import Device from '../models/device.js';
import devices from '../shared/devices.js';

// Helper function to check if device exists in static devices
const getStaticDevice = (id) => devices[id];

// Helper function to convert MongoDB document to plain object
const toPlainObject = (doc) => doc ? doc.toObject() : null;

// Device type-specific operations
const deviceOperations = {
  light: {
    toggle: async (device) => {
      device.state = device.state === 'on' ? 'off' : 'on';
      return device;
    }
  },
  thermostat: {
    toggle: async (device) => {
      device.state = device.state === 'on' ? 'off' : 'on';
      return device;
    },
    setTemperature: async (device, temperature) => {
      device.temperature = temperature;
      return device;
    }
  },
  camera: {
    toggle: async (device) => {
      device.state = device.state === 'on' ? 'off' : 'on';
      device.isRecording = device.state === 'on';
      return device;
    },
    startRecording: async (device) => {
      device.isRecording = true;
      device.state = 'on';
      return device;
    },
    stopRecording: async (device) => {
      device.isRecording = false;
      return device;
    }
  },
  doorLock: {
    toggle: async (device) => {
      device.state = device.state === 'locked' ? 'unlocked' : 'locked';
      device.lastAccessTime = new Date().toISOString();
      return device;
    },
    updateAutoLock: async (device, delay) => {
      device.autoLock = true;
      device.autoLockDelay = delay;
      return device;
    }
  },
  blind: {
    setPosition: async (device, position) => {
      device.position = Math.max(0, Math.min(100, position));
      device.state = 'stopped';
      return device;
    },
    setTilt: async (device, angle) => {
      device.tiltAngle = Math.max(-90, Math.min(90, angle));
      return device;
    },
    toggle: async (device) => {
      device.position = device.position > 0 ? 0 : 100;
      return device;
    }
  }
};

export const getAllDevices = async (req, res) => {
  try {
    const dbDevices = await Device.find();
    
    // Convert dbDevices to a dictionary with ids as keys
    const dbDevicesObj = dbDevices.reduce((acc, device) => {
      acc[device.id] = toPlainObject(device);
      return acc;
    }, {});

    // Combine static devices with database devices
    const combinedDevices = {
      ...devices,
      ...dbDevicesObj
    };

    res.json(Object.values(combinedDevices));
  } catch (error) {
    console.error("Error fetching devices:", error);
    res.status(500).json({ message: "Error fetching devices", error });
  }
};

export const addDevice = async (req, res) => {
  const { id, name, type, state, ...otherProps } = req.body;

  try {
    // Check if device already exists in static devices
    if (devices[id]) {
      return res.status(400).json({ 
        message: "Device already exists in static devices" 
      });
    }

    // Validate device type
    if (!deviceOperations[type]) {
      return res.status(400).json({
        message: "Invalid device type"
      });
    }

    const newDevice = new Device({ 
      id, 
      name, 
      type, 
      state, 
      ...otherProps 
    });
    await newDevice.save();

    res.status(201).json({ 
      message: "Device added successfully", 
      device: newDevice 
    });
  } catch (error) {
    console.error("Error adding device:", error);
    res.status(500).json({ message: "Error adding device", error });
  }
};

export const deleteDevice = async (req, res) => {
  const { _id } = req.params;
  try {
    // Check if device exists in static devices
    const staticDevice = Object.values(devices).find(d => d._id === _id);
    if (staticDevice) {
      return res.status(400).json({ 
        message: 'Cannot delete static device' 
      });
    }

    const deletedDevice = await Device.findOneAndDelete({ _id });
    if (!deletedDevice) {
      return res.status(404).json({ message: 'Device not found' });
    }
    
    res.json({ 
      message: 'Device deleted successfully', 
      deletedDevice 
    });
  } catch (error) {
    console.error('Error deleting device:', error);
    res.status(500).json({ message: 'Error deleting device', error });
  }
};

export const toggleDevice = async (req, res) => {
  const { id } = req.params;
  try {
    // Check both static and database devices
    let device = getStaticDevice(id);
    let isStatic = true;

    if (!device) {
      device = await Device.findOne({ id });
      isStatic = false;
    }

    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }

    // Use device type-specific toggle operation if available
    if (deviceOperations[device.type]?.toggle) {
      device = await deviceOperations[device.type].toggle(device);
    } else {
      // Default toggle behavior
      device.state = device.state === 'on' ? 'off' : 'on';
    }

    // Save if it's a database device
    if (!isStatic && device instanceof Device) {
      await device.save();
    }

    res.json(device);
  } catch (error) {
    console.error("Error toggling device:", error);
    res.status(500).json({ message: "Error toggling device", error });
  }
};

export const updateDeviceSettings = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    let device = getStaticDevice(id);
    let isStatic = true;

    if (!device) {
      device = await Device.findOne({ id });
      isStatic = false;
    }

    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }

    // Apply type-specific operations based on the updates
    if (deviceOperations[device.type]) {
      for (const [key, value] of Object.entries(updates)) {
        if (deviceOperations[device.type][key]) {
          device = await deviceOperations[device.type][key](device, value);
        } else {
          device[key] = value;
        }
      }
    }

    // Save if it's a database device
    if (!isStatic && device instanceof Device) {
      await device.save();
    }

    res.json(device);
  } catch (error) {
    console.error("Error updating device settings:", error);
    res.status(500).json({ message: "Error updating device settings", error });
  }
};

// Specific device type endpoints
export const setBlindsPosition = async (req, res) => {
  const { id } = req.params;
  const { position } = req.body;
  
  try {
    let device = getStaticDevice(id) || await Device.findOne({ id });
    
    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }
    
    if (device.type !== 'blind') {
      return res.status(400).json({ message: "Device is not a blind" });
    }

    device = await deviceOperations.blind.setPosition(device, position);
    
    if (device instanceof Device) {
      await device.save();
    }

    res.json(device);
  } catch (error) {
    res.status(500).json({ message: "Error setting blind position", error });
  }
};

export const toggleLock = async (req, res) => {
  const { id } = req.params;
  
  try {
    let device = getStaticDevice(id) || await Device.findOne({ id });
    
    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }
    
    if (device.type !== 'doorLock') {
      return res.status(400).json({ message: "Device is not a door lock" });
    }

    device = await deviceOperations.doorLock.toggle(device);
    
    if (device instanceof Device) {
      await device.save();
    }

    res.json(device);
  } catch (error) {
    res.status(500).json({ message: "Error toggling lock", error });
  }
};

export const toggleRecording = async (req, res) => {
  const { id } = req.params;
  const { record } = req.body;
  
  try {
    let device = getStaticDevice(id) || await Device.findOne({ id });
    
    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }
    
    if (device.type !== 'camera') {
      return res.status(400).json({ message: "Device is not a camera" });
    }

    device = await deviceOperations.camera[record ? 'startRecording' : 'stopRecording'](device);
    
    if (device instanceof Device) {
      await device.save();
    }

    res.json(device);
  } catch (error) {
    res.status(500).json({ message: "Error toggling recording", error });
  }
};