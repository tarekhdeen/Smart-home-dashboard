import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const roomSchema = new Schema({
    name: { type: String, required: true },
  deviceIds: [{ type: Schema.Types.ObjectId, ref: 'Device' }], // Reference to devices in this room
});

export default model('Room', roomSchema);
