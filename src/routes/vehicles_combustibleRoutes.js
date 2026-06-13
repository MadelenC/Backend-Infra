import { Router } from "express";
import {
  getVehiclesCombustible,
  getResumenVehiculosCombustible,
  getCombustibleMensual,
} from "../controllers/vehicule_combustibleControler.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = Router();

// Rutas para vehículos
router.get("/", authenticate,getVehiclesCombustible);          // Obtener todos los vehículos
router.get("/resumen", authenticate,getResumenVehiculosCombustible); //sacar informe 
router.get("/combustible-mensual",authenticate, getCombustibleMensual);

export default router;
