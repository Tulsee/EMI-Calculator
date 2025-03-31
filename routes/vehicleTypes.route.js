import express from "express";
import {
  createVehicleTypes,
  getVehicleTypes,
} from "../controllers/vehicleTypes.controller.js";

const router = express.Router();

router.get("", getVehicleTypes);
router.post("", createVehicleTypes);

export default router;
