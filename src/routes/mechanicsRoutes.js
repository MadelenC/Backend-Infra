
// src/routes/mechanicsRoutes.js
import { Router } from "express";
import {
  getMechanics,
  getMechanicById,
  createMechanic,
  updateMechanic,
  deleteMechanic,
} from "../controllers/mechanicsController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/",authenticate,  getMechanics);
router.get("/:id", authenticate, getMechanicById);
router.post("/",authenticate, createMechanic);
router.put("/:id", authenticate, updateMechanic);
router.delete("/:id", authenticate, deleteMechanic);

export default router;

