import { Router }
from "express";

import {
  getReporteUsuarios
} from "../controllers/reporteUsuariosController.js";

const router =
  Router();

router.get(
  "/reporte-usuarios",
  getReporteUsuarios
);

export default router;