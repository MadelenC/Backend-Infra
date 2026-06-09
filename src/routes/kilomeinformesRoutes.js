import { Router } from "express";

import {
  getKilomeinformes,
  getKilomeinformeById,
  createKilomeinforme,
  deleteKilomeinforme,
} from "../controllers/kilomeinformesController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/",authenticate,  getKilomeinformes);

router.get("/:id", authenticate, getKilomeinformeById);

router.post("/", authenticate, createKilomeinforme);

router.delete("/:id",authenticate,  deleteKilomeinforme);

export default router;