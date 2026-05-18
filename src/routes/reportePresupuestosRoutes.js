import { Router } from "express";

import {

  getReportePresupuestoById
} from "../controllers/reportePresupuestosController.js";

const router = Router();



router.get("/reporte/:id", getReportePresupuestoById);

export default router;