import { Router } from "express";

import {reporteVehiculos} from "../controllers/reportespdfController.js";
import {generarHojaRuta} from "../controllers/hojaRutaController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = Router();

router.get(
  "/reporte-vehiculos",authenticate, 
  reporteVehiculos
);
router.get(
  "/hoja-ruta/:id",authenticate, 
  generarHojaRuta
);

export default router;