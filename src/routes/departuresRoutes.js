import { Router } from "express";
import {
  getSalidas,
  getSalidaById,
  createSalida,
  updateSalida,
  deleteSalida,
} from "../controllers/departuresController.js";

const router = Router();

router.get("/", getSalidas);            // Obtener todas las salidas
router.get("/:id", getSalidaById);      // Obtener salida por ID
router.post("/", createSalida);         // Crear una nueva salida
router.put("/:id", updateSalida);       // Actualizar salida existente
router.delete("/:id", deleteSalida);    // Eliminar salida

export default router;