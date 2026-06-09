import { Router } from "express";
import {
  getMarcas,
  getMarcaById,
  createMarca,
  updateMarca,
  deleteMarca,
} from "../controllers/marcsController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/",authenticate,  getMarcas);        
router.get("/:id",authenticate,  getMarcaById);    
router.post("/", authenticate, createMarca);       
router.put("/:id",authenticate,  updateMarca);     
router.delete("/:id",authenticate,  deleteMarca);  

export default router;
