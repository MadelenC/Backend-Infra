// routes/infoviajeRoutes.js
import { Router } from "express";

import {
  getInfoviajes,
  getInfoviajeById,
  createInfoviaje,
  updateInfoviaje,
  deleteInfoviaje,
} from "../controllers/infoviajeController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/",authenticate,  getInfoviajes);
router.get("/:id",authenticate,  getInfoviajeById);
router.post("/",authenticate,  createInfoviaje);
router.put("/:id", authenticate, updateInfoviaje);
router.delete("/:id",authenticate,  deleteInfoviaje);

export default router;