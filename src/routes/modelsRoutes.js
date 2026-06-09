import { Router } from "express";
import {
  getModelos,
  getModeloById,
  createModelo,
  updateModelo,
  deleteModelo,
} from "../controllers/modelsController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", authenticate, getModelos);          
router.get("/:id",authenticate,  getModeloById);    
router.post("/", authenticate, createModelo);       
router.put("/:id",authenticate,  updateModelo);     
router.delete("/:id", authenticate, deleteModelo);  

export default router;
