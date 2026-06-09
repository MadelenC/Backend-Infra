// src/routes/vehicleTravelRoutes.js
import { Router } from "express";
import {
  getVehicleTravels,
  getVehicleTravelById,
  createVehicleTravel,
  deleteVehicleTravel,
} from "../controllers/vehicle_travelController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", authenticate,getVehicleTravels);
router.get("/:id",authenticate,getVehicleTravelById);
router.post("/",authenticate, createVehicleTravel);
router.delete("/:id",authenticate, deleteVehicleTravel);

export default router;