// routes/infoviajeRoutes.js
import { Router } from "express";

import {
  getInfoviajes,
  getInfoviajeById,
  createInfoviaje,
  updateInfoviaje,
  deleteInfoviaje,
} from "../controllers/infoviajeController.js";

const router = Router();

router.get("/", getInfoviajes);

router.get("/:id", getInfoviajeById);

router.post("/", createInfoviaje);

router.put("/:id", updateInfoviaje);

router.delete("/:id", deleteInfoviaje);

export default router;