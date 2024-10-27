import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' }, // User roles
  preferences: {
    theme: { type: String, default: 'light' },
    notifications: { type: Boolean, default: true },
  },
});

export const User = model('User', userSchema);

