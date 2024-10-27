import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const deviceSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['light', 'thermostat', 'camera', 'lock'], required: true },
    state: { type: String, enum: ['on', 'off'], default: 'off' },
  room: { type: Schema.Types.ObjectId, ref: 'Room' }, // Reference to Room
  temperature: Number, // For thermostats
  energyUsage: { type: Number, default: 0 }, // For energy monitoring
});

export default model('Device', deviceSchema);
