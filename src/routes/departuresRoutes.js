import { Router } from "express";
import {
  getSalidas,
  getSalidaById,
  createSalida,
  updateSalida,
  deleteSalida,
} from "../controllers/departuresController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", authenticate, getSalidas);            // Obtener todas las salidas
router.get("/:id", authenticate,  getSalidaById);      // Obtener salida por ID
router.post("/", authenticate, createSalida);         // Crear una nueva salida
router.put("/:id",authenticate,  updateSalida);       // Actualizar salida existente
router.delete("/:id",authenticate,  deleteSalida);    // Eliminar salida

export default router;