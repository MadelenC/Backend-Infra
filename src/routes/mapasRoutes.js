import { Router } from "express";
import {
  getMapas,
  getMapaById,
  createMapa,
  updateMapa,
  deleteMapa,
} from "../controllers/mapasController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/",authenticate,  getMapas);
router.get("/:id",authenticate,  getMapaById);
router.post("/", authenticate, createMapa);
router.put("/:id",authenticate,  updateMapa);
router.delete("/:id", authenticate, deleteMapa);

export default router;



