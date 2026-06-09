import express from "express";
import {
  getEntidades,
  getEntidadById,
  createEntidad,
  updateEntidad,
  deleteEntidad
} from "../controllers/entidadesController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/",authenticate,  getEntidades);
router.get("/:id", authenticate, getEntidadById);
router.post("/", authenticate, createEntidad);
router.put("/:id", authenticate, updateEntidad);
router.delete("/:id",authenticate,  deleteEntidad);

export default router;
