import Device from '../models/device.js';
import devices from '../shared/devices.js';

// Helper function to check if device exists in static devices
const getStaticDevice = (id) => devices[id];

// Helper function to convert MongoDB document to plain object
const toPlainObject = (doc) => doc ? doc.toObject() : null;

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
  const { id, name, type, state } = req.body;

  try {
    // Check if device already exists in static devices
    if (devices[id]) {
      return res.status(400).json({ 
        message: "Device already exists in static devices" 
      });
    }

    const newDevice = new Device({ id, name, type, state });
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
    // First check if it's a static device
    let staticDevice = getStaticDevice(id);
    if (staticDevice) {
      // Toggle the static device
      devices[id].state = devices[id].state === 'on' ? 'off' : 'on';
      return res.json(devices[id]);
    }

    // If not static, check database
    let device = await Device.findOne({ id });
    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }

    // Toggle database device state
    device.state = device.state === 'on' ? 'off' : 'on';
    await device.save();
    res.json(device);
  } catch (error) {
    console.error("Error toggling device:", error);
    res.status(500).json({ message: "Error toggling device", error });
  }
};