// routes/rolTravelRoutes.js
import { Router } from "express";
import {
  getRolTravel,
  getRolTravelById,
  createRolTravel,
  updateRolTravel,
  deleteRolTravel,
} from "../controllers/rolTravelController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", authenticate, getRolTravel);          
router.get("/:id",authenticate,  getRolTravelById);  
router.post("/",authenticate,  createRolTravel);      
router.put("/:id", authenticate, updateRolTravel);   
router.delete("/:id", authenticate, deleteRolTravel);

export default router;
