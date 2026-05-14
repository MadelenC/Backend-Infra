import { Router } from "express";

import {
  getKilomecanicos,
  getKilomecanicoById,
  createKilomecanico,
  deleteKilomecanico,
} from "../controllers/kilomecanicosController.js";

const router = Router();

router.get("/", getKilomecanicos);

router.get("/:id", getKilomecanicoById);

router.post("/", createKilomecanico);

router.delete("/:id", deleteKilomecanico);

export default router;