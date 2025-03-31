import mongoose from "mongoose";

const VehicleModelSchema = new mongoose.Schema({
  model: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Vehicle = mongoose.model("Vehicle", VehicleModelSchema);
export default Vehicle;
