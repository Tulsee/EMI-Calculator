import mongoose from "mongoose";

const VehicleTypeSchema = new mongoose.Schema({
  type: String,
});

const VehicleTypes = mongoose.model("VehicleType", VehicleTypeSchema);
export default VehicleTypes;
