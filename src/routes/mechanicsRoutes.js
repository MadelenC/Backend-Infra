
// src/routes/mechanicsRoutes.js
import { Router } from "express";
import {
  getMechanics,
  getMechanicById,
  createMechanic,
  updateMechanic,
  deleteMechanic,
} from "../controllers/mechanicsController.js";

const router = Router();

router.get("/", getMechanics);
router.get("/:id", getMechanicById);
router.post("/", createMechanic);
router.put("/:id", updateMechanic);
router.delete("/:id", deleteMechanic);

export default router;

