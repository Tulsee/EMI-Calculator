import Vehicle from "../models/Vehicle.model.js";
import VehicleTypes from "../models/VehicleTypes.model.js";

export const createVehicle = async (req, res) => {
  const { model, variant, price, vehicleType } = req.body;

  if (!model) return res.status(400).json({ message: "Model is required" });

  if (!price || isNaN(price))
    return res
      .status(400)
      .json({ message: "Price is required and should be number" });

  const newVehicle = new Vehicle({
    model,
    variant,
    price,
    vehicleType,
  });
  try {
    const savedVehicle = await newVehicle.save();
    res.status(201).json(savedVehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getVehicle = async (req, res) => {
  try {
    const { vehicleType, model } = req.query;

    let filter = {};

    if (vehicleType) {
      const type = await VehicleTypes.findOne({ type: vehicleType });

      if (!type) {
        return res.status(404).json({ message: "Vehicle type not found" });
      }
      filter.vehicleType = type._id;
    }
    if (model) {
      filter.model = { $regex: model, $options: "i" }; // Case-insensitive search
    }

    const response = await Vehicle.find(filter).populate("vehicleType");
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
