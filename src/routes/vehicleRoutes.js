import { Router } from "express";
import {
  getVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  registrarCambioAceite,
} from "../controllers/vehicleController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = Router();

// Rutas para vehículos
router.get("/", authenticate,getVehicles);          // Obtener todos los vehículos
router.get("/:id", authenticate,getVehicleById);   // Obtener un vehículo por ID
router.post("/", authenticate,createVehicle);      // Crear un nuevo vehículo
router.put("/:id", authenticate,updateVehicle); 
router.put(  "/:id/cambio-aceite",authenticate, registrarCambioAceite);    // Actualizar un vehículo existente
router.delete("/:id", authenticate,deleteVehicle); // Eliminar un vehículo

export default router;
