import { Router } from "express";
import {
  getViajes,
  getViajeById,
  createFullViaje,
  updateFullViaje,
  deleteFullViaje,
} from "../controllers/travelController.js";

const router = Router();

// Rutas para Viajes completos
router.get("/", getViajes);              // Listar todos los viajes
router.get("/:id", getViajeById);       // Obtener viaje por ID
router.post("/", createFullViaje);      // Crear viaje completo
router.put("/:id", updateFullViaje);    // Actualizar viaje completo
router.delete("/:id", deleteFullViaje); // Eliminar viaje completo

export default router;