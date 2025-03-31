import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import VehicleTypes from "../models/VehicleTypes.model.js";
import Vehicle from "../models/Vehicle.model.js";

const vehicleTypesData = [
  { type: "Two-wheeler" },
  { type: "Four-wheeler" },
  { type: "Moped" },
];

async function seedDatabase() {
  try {
    await mongoose.connect(
      "mongodb://root:root@localhost:27017/emi-calculator?authSource=admin",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to MongoDB");

    // Insert Vehicle Types
    const insertedVehicleTypes = await VehicleTypes.insertMany(
      vehicleTypesData
    );
    console.log("Vehicle Types Inserted");

    // Create a mapping of vehicle type names to their inserted ObjectIds
    const vehicleTypeMap = {};
    insertedVehicleTypes.forEach((type) => {
      vehicleTypeMap[type.type] = type._id;
    });

    // Load vehicle models from JSON file
    const jsonPath = path.resolve("./vehicle_models.json");
    const vehicleModelsData = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

    // Replace vehicleType string with actual ObjectId
    const formattedVehicles = vehicleModelsData.map((vehicle) => ({
      model: vehicle.model,
      variant: vehicle.variant,
      price: vehicle.price,
      vehicleType: vehicleTypeMap[vehicle.vehicleType],
      createdAt: new Date(vehicle.createdAt),
    }));

    // Insert Vehicles
    await Vehicle.insertMany(formattedVehicles);
    console.log("Vehicle Models Inserted");

    mongoose.connection.close();
    console.log("Database seeding complete");
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.connection.close();
  }
}

seedDatabase();
