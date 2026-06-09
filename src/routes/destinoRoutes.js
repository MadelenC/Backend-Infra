// src/routes/destinoRoutes.js
import { Router } from "express";
import {
  getDestinos,
  getDestinoById,
  createDestino,
  updateDestino,
  deleteDestino,
} from "../controllers/destinoController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", authenticate,  getDestinos);
router.get("/:id",authenticate, getDestinoById);
router.post("/",authenticate,  createDestino);
router.put("/:id",authenticate,  updateDestino);
router.delete("/:id",authenticate,  deleteDestino);

export default router;
