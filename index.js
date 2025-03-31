import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import VehicleRoute from "./routes/vehicle.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, { connectTimeoutMS: 10000 })
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/vehicle", VehicleRoute);

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
