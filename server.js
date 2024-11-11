import express from "express";
import { createServer } from "http";
import cors from "cors";
import connectDB from "./config/db.js";
import configureSocket from "./config/socket.js";
import userRoutes from "./routes/userRoutes.js";
import deviceRoutes from "./routes/deviceRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import { updateRandomThermostat } from "./services/thermostatService.js";

const app = express();
const http = createServer(app);
const io = configureSocket(http);
const PORT = 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/devices", deviceRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/activities", activityRoutes);

// Thermostat update simulation
setInterval(() => updateRandomThermostat(io), 5000);

// Start server
http.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
