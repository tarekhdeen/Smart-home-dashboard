import mongoose from 'mongoose';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import deviceRoutes from './routes/deviceRoutes.js';
import roomRoutes from './routes/roomRoutes.js';
import Device from './models/device.js';

const app = express();
const http = createServer(app);
const io = new Server(http, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

const PORT = 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/smart-home-dashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);        // User routes for authentication
app.use('/api/devices', deviceRoutes);     // Device routes for device management
app.use('/api/rooms', roomRoutes);         // Room routes for room management

// WebSocket for real-time device updates
io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
  });
});

// Real-time update simulation for thermostats
setInterval(async () => {
  try {
    const devices = await Device.find({ type: 'thermostat' }); // Assuming `Device` is imported from models
    const randomDevice = devices[Math.floor(Math.random() * devices.length)];

    if (randomDevice) {
      randomDevice.temperature += Math.random() > 0.5 ? 1 : -1;
      await randomDevice.save();
      io.emit('deviceUpdate', randomDevice);
    }
  } catch (error) {
    console.error('Error updating thermostat:', error);
  }
}, 5000);

// Start the server
http.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});