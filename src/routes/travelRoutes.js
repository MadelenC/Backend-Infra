import { Router } from "express";
import {
  getViajes,
  getViajeById,
  createFullViaje,
  updateFullViaje,
  deleteFullViaje,
  cancelViajeController,
 
} from "../controllers/travelController.js";

import { authenticate } from "../middlewares/authMiddleware.js";

const router = Router();


router.get("/",authenticate, getViajes);             
router.get("/:id",authenticate,  getViajeById);       
router.post("/", authenticate, createFullViaje);     
router.put("/:id",authenticate,  updateFullViaje);    
router.delete("/:id",authenticate,  deleteFullViaje); 
router.patch("/:id/cancelar",authenticate,  cancelViajeController);

export default router;