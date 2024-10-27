import Device from '../models/device.js';
import devices from '../shared/devices.js';

export const getAllDevices = async (req, res) => {
  try {
    const dbDevices = await Device.find(); // Fetch devices from MongoDB

    // Convert dbDevices to a dictionary with ids as keys for easier merging
    const dbDevicesObj = dbDevices.reduce((acc, device) => {
      acc[device.id] = device;
      return acc;
    }, {});

    // Combine static devices with database devices
    const combinedDevices = {
      ...devices,
      ...dbDevicesObj
    };

    res.json(Object.values(combinedDevices)); // Return combined devices as an array
  } catch (error) {
    console.error("Error fetching devices:", error);
    res.status(500).json({ message: "Error fetching devices", error });
  }
};

export const addDevice = async (req, res) => {
  const { id, name, type, state } = req.body;

  try {
    const newDevice = new Device({ id, name, type, state });
    await newDevice.save(); // Save to MongoDB

    res.status(201).json({ message: "Device added successfully", device: newDevice });
  } catch (error) {
    console.error("Error adding device:", error);
    res.status(500).json({ message: "Error adding device", error });
  }
};

export const deleteDevice = async (req, res) => {
  const { _id } = req.params; // Extracting the ID from the URL parameters
  try {
    const deletedDevice = await Device.findOneAndDelete({ _id });
    if (!deletedDevice) {
      return res.status(404).json({ message: 'Device not found' });
    }
    res.json({ message: 'Device deleted successfully', deletedDevice });
  } catch (error) {
    console.error('Error deleting device:', error);
    res.status(500).json({ message: 'Error deleting device', error });
  }
};
