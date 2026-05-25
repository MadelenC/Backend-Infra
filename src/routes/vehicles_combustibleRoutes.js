import { Router } from "express";
import {
  getVehiclesCombustible,
  getResumenVehiculosCombustible,
} from "../controllers/vehicule_combustibleControler.js";

const router = Router();

// Rutas para vehículos
router.get("/", getVehiclesCombustible);          // Obtener todos los vehículos
router.get("/resumen", getResumenVehiculosCombustible); //sacar informe 


export default router;
