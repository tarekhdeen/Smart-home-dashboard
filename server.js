import mongoose from 'mongoose';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import deviceRoutes from './routes/deviceRoutes.js';
import roomRoutes from './routes/roomRoutes.js';
import Device from './models/device.js';
import devices from './shared/devices.js';

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
app.use('/api/users', userRoutes);
app.use('/api/devices', deviceRoutes);
app.use('/api/rooms', roomRoutes);

// WebSocket connection handling
io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
  });
});

// Helper function to get all thermostats (both static and from DB)
const getAllThermostats = async () => {
  // Get static thermostats
  const staticThermostats = Object.values(devices).filter(
    device => device.type === 'thermostat'
  );

  // Get database thermostats
  const dbThermostats = await Device.find({ type: 'thermostat' });

  return [...staticThermostats, ...dbThermostats];
};

// Real-time update simulation for thermostats
setInterval(async () => {
  try {
    const allThermostats = await getAllThermostats();
    
    if (allThermostats.length > 0) {
      // Pick a random thermostat
      const randomThermostat = allThermostats[Math.floor(Math.random() * allThermostats.length)];
      
      if (randomThermostat) {
        // Update temperature
        const temperatureChange = Math.random() > 0.5 ? 1 : -1;

        // Check if it's a static thermostat
        if (devices[randomThermostat.id]) {
          devices[randomThermostat.id].temperature += temperatureChange;
          io.emit('deviceUpdate', devices[randomThermostat.id]);
        } 
        // If it's a database thermostat
        else if (randomThermostat instanceof mongoose.Model) {
          randomThermostat.temperature += temperatureChange;
          await randomThermostat.save();
          io.emit('deviceUpdate', randomThermostat);
        }

        console.log(`Updated thermostat ${randomThermostat.id} temperature`);
      }
    }
  } catch (error) {
    console.error('Error updating thermostat:', error);
  }
}, 5000);

// Start the server
http.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});