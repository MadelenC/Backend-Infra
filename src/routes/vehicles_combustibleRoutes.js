import { Router } from "express";
import {
  getVehiclesCombustible,
  getResumenVehiculosCombustible,
} from "../controllers/vehicule_combustibleControler.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = Router();

// Rutas para vehículos
router.get("/", authenticate,getVehiclesCombustible);          // Obtener todos los vehículos
router.get("/resumen", authenticate,getResumenVehiculosCombustible); //sacar informe 


export default router;
