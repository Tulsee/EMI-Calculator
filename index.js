import express from "express";
import dotenv from "dotenv";
import os from "os";
import mongoose from "mongoose";
import cors from "cors";

import VehicleRoute from "./routes/vehicle.route.js";
import VehicleTypesRoute from "./routes/vehicleTypes.route.js";

dotenv.config();
const PORT = 8001;

mongoose
  .connect(process.env.MONGO_URI, { connectTimeoutMS: 10000 })
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/vehicle", VehicleRoute);
app.use("/api/vehicleTypes", VehicleTypesRoute);

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.listen(PORT, "0.0.0.0", async () => {
  const networkInterfaces = os.networkInterfaces();
  const localIP = Object.values(networkInterfaces)
    .flat()
    .find((iface) => iface?.family === "IPv4" && !iface.internal)?.address;

  console.log(`🚀 HTTP Server running on:`);
  console.log(`   - Local:    http://localhost:${PORT}`);
  console.log(`   - Network:  http://${localIP}:${PORT}`);
});
