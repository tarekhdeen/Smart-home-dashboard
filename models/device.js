import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const deviceSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  state: { type: String, default: 'off' },
  temperature: { type: Number }
});

export default model('Device', deviceSchema);
