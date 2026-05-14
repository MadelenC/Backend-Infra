import { Router } from "express";

import {
  getKilomeinformes,
  getKilomeinformeById,
  createKilomeinforme,
  deleteKilomeinforme,
} from "../controllers/kilomeinformesController.js";

const router = Router();

router.get("/", getKilomeinformes);

router.get("/:id", getKilomeinformeById);

router.post("/", createKilomeinforme);

router.delete("/:id", deleteKilomeinforme);

export default router;