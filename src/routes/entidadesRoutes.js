import express from "express";
import {
  getEntidades,
  getEntidadById,
  createEntidad,
  updateEntidad,
  deleteEntidad
} from "../controllers/entidadesController.js";

const router = express.Router();

router.get("/", getEntidades);
router.get("/:id", getEntidadById);
router.post("/", createEntidad);
router.put("/:id", updateEntidad);
router.delete("/:id", deleteEntidad);

export default router;
