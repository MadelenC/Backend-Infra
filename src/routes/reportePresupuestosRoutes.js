import { Router } from "express";

import {

  getReportePresupuestoById
} from "../controllers/reportePresupuestosController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = Router();



router.get("/reporte/:id",authenticate,  getReportePresupuestoById);

export default router;