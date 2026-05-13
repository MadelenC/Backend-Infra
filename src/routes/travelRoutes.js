import { Router } from "express";
import {
  getViajes,
  getViajeById,
  createFullViaje,
  updateFullViaje,
  deleteFullViaje,
  cancelViajeController,
 
} from "../controllers/travelController.js";

const router = Router();


router.get("/", getViajes);             
router.get("/:id", getViajeById);       
router.post("/", createFullViaje);     
router.put("/:id", updateFullViaje);    
router.delete("/:id", deleteFullViaje); 
router.patch("/:id/cancelar", cancelViajeController);

export default router;