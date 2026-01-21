// src/routes/destinoRoutes.js
import { Router } from "express";
import {
  getDestinos,
  getDestinoById,
  createDestino,
  updateDestino,
  deleteDestino,
} from "../controllers/destinoController.js";

const router = Router();

router.get("/", getDestinos);
router.get("/:id", getDestinoById);
router.post("/", createDestino);
router.put("/:id", updateDestino);
router.delete("/:id", deleteDestino);

export default router;
