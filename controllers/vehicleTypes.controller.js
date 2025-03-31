import VehicleTypes from "../models/VehicleTypes.model.js";

export const createVehicleTypes = async (req, res) => {
  const { type } = req.body;
  if (!type) return res.status(400).json({ message: "Type is required" });
  const newVehicleType = new VehicleTypes({
    type,
  });
  try {
    const savedVehicleType = await newVehicleType.save();
    res.status(201).json(savedVehicleType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getVehicleTypes = async (req, res) => {
  const response = await VehicleTypes.find();
  res.status(200).json(response);
};
