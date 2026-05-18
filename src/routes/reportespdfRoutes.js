import { Router } from "express";

import {reporteVehiculos} from "../controllers/reportespdfController.js";
import {generarHojaRuta} from "../controllers/hojaRutaController.js";

const router = Router();

router.get(
  "/reporte-vehiculos",
  reporteVehiculos
);
router.get(
  "/hoja-ruta/:id",
  generarHojaRuta
);

export default router;