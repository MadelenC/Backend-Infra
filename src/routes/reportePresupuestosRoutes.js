import { Router }
from "express";

import {
  getReportePresupuestos
} from "../controllers/reportePresupuestosController.js";

const router = Router();

router.get(
  "/reporte",
  getReportePresupuestos
);

export default router;