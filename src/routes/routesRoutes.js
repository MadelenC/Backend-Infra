import { Router } from "express";
import {
  getRutas,
  getRutaById,
  createRuta,
  updateRuta,
  deleteRuta,
} from "../controllers/routesController.js";

const router = Router();

// CRUD de rutas
router.get("/", getRutas);
router.get("/:id", getRutaById);
router.post("/", createRuta);
router.put("/:id", updateRuta);
router.delete("/:id", deleteRuta);

export default router;