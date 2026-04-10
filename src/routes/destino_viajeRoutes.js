// src/routes/destinoViajeRoutes.js
import { Router } from "express";
import {
  getDestinoViajes,
  getDestinoViajeById,
  createDestinoViaje,
  deleteDestinoViaje,
} from "../controllers/destino_viajeController.js";

const router = Router();

router.get("/", getDestinoViajes);
router.get("/:id", getDestinoViajeById);
router.post("/", createDestinoViaje);
router.delete("/:id", deleteDestinoViaje);

export default router;