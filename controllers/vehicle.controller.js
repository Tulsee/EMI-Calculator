import Vehicle from "../models/Vehicle.model.js";

export const createVehicle = async (req, res) => {
  const { model, variant, price } = req.body;

  if (!model) return res.status(400).json({ message: "Model is required" });

  if (!price || isNaN(price))
    return res
      .status(400)
      .json({ message: "Price is required and should be number" });

  const newVehicle = new Vehicle({
    model,
    variant,
    price,
  });
  try {
    const savedVehicle = await newVehicle.save();
    res.status(201).json(savedVehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
