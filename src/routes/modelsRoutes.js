import { Router } from "express";
import {
  getModelos,
  getModeloById,
  createModelo,
  updateModelo,
  deleteModelo,
} from "../controllers/modelsController.js";

const router = Router();

router.get("/", getModelos);          
router.get("/:id", getModeloById);    
router.post("/", createModelo);       
router.put("/:id", updateModelo);     
router.delete("/:id", deleteModelo);  

export default router;
