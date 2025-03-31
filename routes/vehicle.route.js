import express from "express";
import {
  createVehicle,
  getVehicle,
} from "../controllers/vehicle.controller.js";

const router = express.Router();

router.post("", createVehicle);
router.get("", getVehicle);

export default router;
