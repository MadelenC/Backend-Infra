import { Router } from "express";
import {
  getVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} from "../controllers/vehicleController.js";

const router = Router();

// Rutas para vehículos
router.get("/", getVehicles);          // Obtener todos los vehículos
router.get("/:id", getVehicleById);   // Obtener un vehículo por ID
router.post("/", createVehicle);      // Crear un nuevo vehículo
router.put("/:id", updateVehicle);    // Actualizar un vehículo existente
router.delete("/:id", deleteVehicle); // Eliminar un vehículo

export default router;
