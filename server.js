import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import devices from './mockDevices.js';

const app = express();
const http = createServer(app);
const io = new Server(http, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"]
  }
});

const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/api/devices', (req, res) => {
  res.json(Object.values(devices));
});

app.post('/api/devices/:id/toggle', (req, res) => {
  const deviceId = req.params.id;
  console.log('Toggling device:', deviceId);
  const device = Object.values(devices).find(d => d.id === deviceId);
  if (device && device.type === 'light') {
    device.state = device.state === 'on' ? 'off' : 'on';
    console.log('New device state:', device.state);
    io.emit('deviceUpdate', device);
    res.json(device);
  } else {
    console.log('Device not found or not a light');
    res.status(404).send('Device not found or is not a light');
  }
});

// Simulate random updates
setInterval(() => {
  const deviceArray = Object.values(devices);
  const randomDevice = deviceArray[Math.floor(Math.random() * deviceArray.length)];
  if (randomDevice.type === 'thermostat') {
    randomDevice.temperature += Math.random() > 0.5 ? 1 : -1;
    io.emit('deviceUpdate', randomDevice);
  }
}, 5000);

http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});