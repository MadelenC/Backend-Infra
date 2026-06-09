import { Router }
from "express";

import {
  getReporteUsuarios
} from "../controllers/reporteUsuariosController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router =
  Router();

router.get(
  "/reporte-usuarios",authenticate, 
  getReporteUsuarios
);

export default router;