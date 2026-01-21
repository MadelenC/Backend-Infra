import { Router } from "express";
import {
  getMapas,
  getMapaById,
  createMapa,
  updateMapa,
  deleteMapa,
} from "../controllers/mapasController.js";

const router = Router();

router.get("/", getMapas);
router.get("/:id", getMapaById);
router.post("/", createMapa);
router.put("/:id", updateMapa);
router.delete("/:id", deleteMapa);

export default router;



