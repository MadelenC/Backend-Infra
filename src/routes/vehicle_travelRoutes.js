// src/routes/vehicleTravelRoutes.js
import { Router } from "express";
import {
  getVehicleTravels,
  getVehicleTravelById,
  createVehicleTravel,
  deleteVehicleTravel,
} from "../controllers/vehicle_travelController.js";

const router = Router();

router.get("/", getVehicleTravels);
router.get("/:id", getVehicleTravelById);
router.post("/", createVehicleTravel);
router.delete("/:id", deleteVehicleTravel);

export default router;