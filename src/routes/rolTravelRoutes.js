// routes/rolTravelRoutes.js
import { Router } from "express";
import {
  getRolTravel,
  getRolTravelById,
  createRolTravel,
  updateRolTravel,
  deleteRolTravel,
} from "../controllers/rolTravelController.js";

const router = Router();

router.get("/", getRolTravel);          
router.get("/:id", getRolTravelById);  
router.post("/", createRolTravel);      
router.put("/:id", updateRolTravel);   
router.delete("/:id", deleteRolTravel);

export default router;
