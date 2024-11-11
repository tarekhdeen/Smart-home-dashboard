import mongoose from "mongoose";
import Device from "../models/device.js";
import devices from "../shared/devices.js";

export const getAllThermostats = async () => {
  const staticThermostats = Object.values(devices).filter(
    (device) => device.type === "thermostat"
  );
  const dbThermostats = await Device.find({ type: "thermostat" });
  return [...staticThermostats, ...dbThermostats];
};

export const updateRandomThermostat = async (io) => {
  try {
    const allThermostats = await getAllThermostats();
    if (allThermostats.length > 0) {
      const randomThermostat =
        allThermostats[Math.floor(Math.random() * allThermostats.length)];
      if (randomThermostat) {
        const temperatureChange = Math.random() > 0.5 ? 1 : -1;

        if (devices[randomThermostat.id]) {
          devices[randomThermostat.id].temperature += temperatureChange;
          io.emit("deviceUpdate", devices[randomThermostat.id]);
        } else if (randomThermostat instanceof mongoose.Model) {
          randomThermostat.temperature += temperatureChange;
          await randomThermostat.save();
          io.emit("deviceUpdate", randomThermostat);
        }
        console.log(`Updated thermostat ${randomThermostat.id} temperature`);
      }
    }
  } catch (error) {
    console.error("Error updating thermostat:", error);
  }
};
