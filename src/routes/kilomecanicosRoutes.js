import { Router } from "express";

import {
  getKilomecanicos,
  getKilomecanicoById,
  createKilomecanico,
  deleteKilomecanico,
} from "../controllers/kilomecanicosController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", authenticate, getKilomecanicos);

router.get("/:id",authenticate,  getKilomecanicoById);

router.post("/", authenticate, createKilomecanico);

router.delete("/:id", authenticate, deleteKilomecanico);

export default router;