import { Router } from "express";
import {
  getViajes,
  getViajeById,
  createViaje,
  updateViaje,
  deleteViaje,
} from "../controllers/travelController.js";

const router = Router();

// Rutas para Viajes
router.get("/", getViajes);           
router.get("/:id", getViajeById);    
router.post("/", createViaje);       
router.put("/:id", updateViaje);     
router.delete("/:id", deleteViaje);  

export default router;