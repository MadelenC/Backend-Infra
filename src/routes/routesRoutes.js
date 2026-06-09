import { Router } from "express";
import {
  getRutas,
  getRutaById,
  createRuta,
  updateRuta,
  deleteRuta,
} from "../controllers/routesController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = Router();

// CRUD de rutas
router.get("/",authenticate,  getRutas);
router.get("/:id",authenticate,  getRutaById);
router.post("/", authenticate, createRuta);
router.put("/:id",authenticate,  updateRuta);
router.delete("/:id",authenticate,  deleteRuta);

export default router;