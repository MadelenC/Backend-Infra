// src/routes/destinoViajeRoutes.js
import { Router } from "express";
import {
  getDestinoViajes,
  getDestinoViajeById,
  createDestinoViaje,
  deleteDestinoViaje,
} from "../controllers/destino_viajeController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", authenticate, getDestinoViajes);
router.get("/:id",authenticate,  getDestinoViajeById);
router.post("/", authenticate, createDestinoViaje);
router.delete("/:id",authenticate,  deleteDestinoViaje);

export default router;